import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { FlipTestCallbackService } from './flip-test-callback.service';
import { FlipAcceptPaymentCallbackRequest } from './dto/flip-accept-payment-callback.dto';
import { FlipTransactionCallbackRequest } from './dto/flip-transaction-callback-example.dto';

@Controller('flip-test-callback')
export class FlipTestCallbackController {
  private readonly logger = new Logger(FlipTestCallbackController.name);

  constructor(
    private readonly flipTestCallbackService: FlipTestCallbackService,
  ) {}

  @Get('ping')
  async ping() {
    return await this.flipTestCallbackService.ping();
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
