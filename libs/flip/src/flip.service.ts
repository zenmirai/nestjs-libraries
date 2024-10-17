import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { flipEndpoint } from './constant/flip-endpoint.constant';
import {
  FlipCreateBillWithCustomerDataRequest,
  FlipCreateBillWithCustomerDataResponse,
  FlipCreateDisbursementRequest,
  FlipCreateDisbursementResponse,
  FlipGetBalanceResponse,
} from './dto';
import { FlipOptionContract } from './interface/flip-disk.interface';

@Injectable()
export class FlipService {
  private readonly secret: string;
  private readonly validationToken: string;
  private readonly logger = new Logger(FlipService.name);

  constructor(private readonly options: FlipOptionContract) {
    this.logger.log('setting up flip payment adapter');
    this.secret = options.secret;
    this.validationToken = options.validationToken;
    this.logger.log('done setup flip payment adapter');
  }

  private async send<T extends object>(
    options: {
      url: string;
      method: 'GET' | 'POST';
      body?: any;
      idempotencyKey?: string;
    },
    validationObject?: ClassConstructor<T>,
  ): Promise<T> {
    this.logger.log(`sending to ${options.url}`);

    if (options.body) {
      this.logger.log(`body: ${JSON.stringify(options.body)}`);
    }

    const encodedSecret = Buffer.from(`${this.secret}:`).toString('base64');
    const authorizationHeader = `Basic ${encodedSecret}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'idempotency-key': options.idempotencyKey
        ? `test-${options.idempotencyKey}`
        : null,
      Authorization: authorizationHeader,
    };

    const result = await fetch(options.url, {
      method: options.method,
      headers: headers,
      body: options.body ? new URLSearchParams(options.body).toString() : null,
    });

    const json = (await result.json()) as unknown;

    if (json && typeof json === 'object' && !Array.isArray(json)) {
      if (!validationObject) {
        this.logger.warn(`dto is not passed, passing JSON without validation`);
        return json as T;
      }

      const object = plainToInstance(validationObject, json);
      await validate(object).then((err) => {
        if (err.length > 0) {
          console.debug(err);
          this.logger.error(`Validation error: ${JSON.stringify(err)}`);
          throw new InternalServerErrorException(
            `Validation error for response on ${options.url}`,
          );
        }
      });

      return json as T;
    } else {
      throw new InternalServerErrorException(
        'Response is not of expected type',
      );
    }
  }

  async validateCallbackToken(token: string): Promise<boolean> {
    this.logger.log(`Comparing ${token} with ${this.validationToken}`);
    if (token !== this.validationToken) {
      this.logger.warn('Token is invalid');
      return false;
    }

    this.logger.log('Token is valid');
    return true;
  }

  async getBalance(): Promise<FlipGetBalanceResponse> {
    this.logger.log('getting current balance');

    const result = await this.send(
      {
        url: flipEndpoint.general.balance,
        method: 'GET',
      },
      FlipGetBalanceResponse,
    );

    this.logger.log('done');
    return result;
  }

  async createDisbursement(
    data: FlipCreateDisbursementRequest,
  ): Promise<FlipCreateDisbursementResponse> {
    this.logger.log('Creating disbursement');

    const { idempotency_key, ...body } = data;

    const result = await this.send(
      {
        url: flipEndpoint.disbursement.create,
        method: 'POST',
        body: body,
        idempotencyKey: idempotency_key,
      },
      FlipCreateDisbursementResponse,
    );

    this.logger.log('Disbursement created');
    return result;
  }

  async createBill(
    data: FlipCreateBillWithCustomerDataRequest,
  ): Promise<FlipCreateBillWithCustomerDataResponse> {
    this.logger.log('Creating bill');

    const payload = new FlipCreateBillWithCustomerDataRequest(data);

    const result = await this.send(
      {
        url: flipEndpoint.bill.create,
        method: 'POST',
        body: payload,
      },
      FlipCreateBillWithCustomerDataResponse,
    );

    this.logger.log('done');
    return result;
  }
}
