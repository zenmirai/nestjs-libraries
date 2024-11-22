import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlipCreateBillWithCustomerDataRequest, FlipCreateBillWithCustomerDataResponse, FlipCreateDisbursementRequest, FlipCreateDisbursementResponse, FlipService } from '@zenmirai/nest-flip';

@Controller('flip-test')
export class FlipTestController {
  constructor(
    private readonly flipService: FlipService
  ) { }

  @Get('balance')
  async getBalance() {
    return await this.flipService.getBalance();
  }

  @Post('create-disbursement')
  async createDisbursement(@Body() req: FlipCreateDisbursementRequest): Promise<FlipCreateDisbursementResponse> {
    return await this.flipService.createDisbursement({
      account_number: '1',
      amount: 30000,
      bank_code: '001',
      idempotency_key: 'xx',
      beneficiary_email: 'test@localhost',
      recipient_city: 1,
      remark: 'testing by zenmirai flip test module'
    });
  }

  @Post('create-bill')
  async createBill(@Body() req: FlipCreateBillWithCustomerDataRequest): Promise<FlipCreateBillWithCustomerDataResponse> {
    return await this.flipService.createBill({
      amount: 40000,
      sender_email: 'test@localhost',
      sender_name: 'zenmirai flip module',
      step: 2,
      title: 'hello',
      type: 'SINGLE',
    });
  }

}
