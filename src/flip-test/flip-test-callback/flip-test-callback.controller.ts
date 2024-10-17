import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import {
  FlipAcceptPaymentCallbackRequest,
  FlipBankInquiryCallbackRequest,
  FlipTransactionCallbackRequest,
} from 'flip/flip';
import { FlipTestCallbackService } from './flip-test-callback.service';

@Controller('flip-test-callback')
export class FlipTestCallbackController {
  private readonly logger = new Logger(FlipTestCallbackController.name);

  constructor(
    private readonly flipTestCallbackService: FlipTestCallbackService,
  ) {}

  @HttpCode(200)
  @Post('bank-inquiry')
  async bankInquiryCallback(@Body() req: FlipBankInquiryCallbackRequest) {
    this.logger.log('start');
    this.flipTestCallbackService.handleBankInquiryCallback(req);
  }

  @HttpCode(200)
  @Post('transaction')
  async transactionCallback(@Body() data: FlipTransactionCallbackRequest) {
    this.logger.log('start');
    this.flipTestCallbackService.handleTransactionCallback(data);
  }

  @HttpCode(200)
  @Post('accept-payment')
  async acceptPaymentCallback(@Body() data: FlipAcceptPaymentCallbackRequest) {
    this.logger.log('start');
    this.flipTestCallbackService.handleAcceptPaymentCallback(data);
  }
}
