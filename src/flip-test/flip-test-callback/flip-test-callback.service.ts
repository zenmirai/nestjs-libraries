import { Injectable, Logger } from '@nestjs/common';
import { FlipService } from '@zenmirai/nest-flip';
import { FlipAcceptPaymentCallbackRequest } from './dto/flip-accept-payment-callback.dto';
import { FlipTransactionCallbackRequest } from './dto/flip-transaction-callback-example.dto';

@Injectable()
export class FlipTestCallbackService {
  private readonly logger = new Logger(FlipTestCallbackService.name);

  constructor(private readonly flipService: FlipService) {}

  async ping() {
    return await this.flipService.getBalance();
  }

  validateCallbackToken(token: string): boolean {
    return this.flipService.validateCallbackToken(token);
  }

  handleAcceptPaymentCallback(data: FlipAcceptPaymentCallbackRequest) {
    this.logger.log('Handling Accept Payment Callback');
    this.logger.verbose(data);

    /**
     * Business Logic Here
     */
  }

  handleTransactionCallback(data: FlipTransactionCallbackRequest) {
    this.logger.log('Handling Transaction Callback');
    this.logger.verbose(data);

    /**
     * Business Logic Here
     */
  }
}
