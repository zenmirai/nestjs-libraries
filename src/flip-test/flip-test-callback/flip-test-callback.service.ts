import { Injectable, Logger } from '@nestjs/common';
import { FlipAcceptPaymentCallbackRequest, FlipBankInquiryCallbackRequest, FlipCallbackServiceInterface, FlipTransactionCallbackRequest } from 'flip/flip';

@Injectable()
export class FlipTestCallbackService implements FlipCallbackServiceInterface {

  private readonly logger = new Logger(FlipTestCallbackService.name);

  constructor() {}

  handleAcceptPaymentCallback(data: FlipAcceptPaymentCallbackRequest) {
    this.logger.log('Handling Accept Payment Callback');
    this.logger.verbose(data);
  }

  handleBankInquiryCallback(data: FlipBankInquiryCallbackRequest) {
    this.logger.log('Handling Bank Inquiry Callback');
    this.logger.verbose(data);
  }

  handleTransactionCallback(data: FlipTransactionCallbackRequest) {
    this.logger.log('Handling Transaction Callback');
    this.logger.verbose(data);
  }

}
