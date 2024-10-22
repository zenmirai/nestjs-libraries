import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { flipEndpoint } from './constant/flip-endpoint.constant';
import { FLIP_CONFIG_OPTION_TOKEN } from './constant/flip.constant';
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

  constructor(
    @Inject(FLIP_CONFIG_OPTION_TOKEN)
    private readonly options: FlipOptionContract,
  ) {
    this.logger.verbose('setting up flip payment service');
    this.secret = options.secret;
    this.validationToken = options.validationToken;
    this.logger.verbose('done setup flip payment service');
  }

  private getAcceptPayment() {
    // validate

    // https://docs.nestjs.com/recipes/async-local-storage

    return;
  }

  private async send(options: {
    url: string;
    method: 'GET' | 'POST';
    body?: any;
    idempotencyKey?: string;
  }): Promise<unknown> {
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

    return json;
  }

  private async validateResponse<T extends object>(
    response: any,
    validationObject: ClassConstructor<T>,
  ): Promise<T> {
    if (!response || typeof response !== 'object' || Array.isArray(response)) {
      throw new InternalServerErrorException(
        'Response is not of expected type',
      );
    }

    const object = plainToInstance(validationObject, response);
    await validate(object).then((err) => {
      if (err.length > 0) {
        this.logger.error(`Validation error: ${JSON.stringify(err)}`);
        throw Error(
          `Validation error for response on ${validationObject.name}`,
        );
      }
    });

    return object;
  }

  validateCallbackToken(token: string): boolean {
    this.logger.log(`Comparing ${token} with ${this.validationToken}`);
    if (token !== this.validationToken) {
      this.logger.warn('Token is invalid');
      return false;
    }

    this.logger.log('Token is valid');
    return true;
  }

  /**
   * Get current balance on flip account
   * @returns {Promise<FlipGetBalanceResponse>}
   */
  async getBalance(): Promise<FlipGetBalanceResponse> {
    this.logger.log('getting current balance');

    const response = await this.send({
      url: flipEndpoint.general.balance,
      method: 'GET',
    });

    const result = await this.validateResponse(
      response,
      FlipGetBalanceResponse,
    );

    this.logger.log('done');
    return result;
  }

  /**
   * Send Money to another account, receives callback on success/failure
   * @returns {Promise<FlipCreateDisbursementResponse>}
   */
  async createDisbursement(
    data: FlipCreateDisbursementRequest,
  ): Promise<FlipCreateDisbursementResponse> {
    this.logger.log('Creating disbursement');

    const { idempotency_key, ...body } = data;

    const response = await this.send({
      url: flipEndpoint.disbursement.create,
      method: 'POST',
      body: body,
      idempotencyKey: idempotency_key,
    });

    const result = await this.validateResponse(
      response,
      FlipCreateDisbursementResponse,
    );

    this.logger.log('Disbursement created');
    return result;
  }

  /**
   * Requests Money from another account, receives callback on success/failure
   * @returns {Promise<FlipCreateBillWithCustomerDataResponse>}
   */
  async createBill(
    data: FlipCreateBillWithCustomerDataRequest,
  ): Promise<FlipCreateBillWithCustomerDataResponse> {
    this.logger.log('Creating bill');

    const response = await this.send({
      url: flipEndpoint.bill.create,
      method: 'POST',
      body: data,
    });

    const result = await this.validateResponse(
      response,
      FlipCreateBillWithCustomerDataResponse,
    );

    this.logger.log('done');
    return result;
  }
}
