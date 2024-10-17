import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { FlipTestService } from './flip-test.service';
import { FlipCreateBillWithCustomerDataRequest, FlipCreateBillWithCustomerDataResponse, FlipCreateDisbursementRequest, FlipCreateDisbursementResponse } from 'flip/flip';

@Controller('flip-test')
export class FlipTestController {
  private readonly logger = new Logger(FlipTestController.name);

  constructor(private readonly flipTestService: FlipTestService) {}

  @Get('get-balance')
  async getBalance() {
    return await this.flipTestService.getBalance();
  }

  @Post('create-disbursement')
  async createDisbursement(@Body() req: FlipCreateDisbursementRequest): Promise<FlipCreateDisbursementResponse> {
    return await this.flipTestService.createDisbursement(req);
  }

  @Post('create-bill')
  async createBill(@Body() req: FlipCreateBillWithCustomerDataRequest): Promise<FlipCreateBillWithCustomerDataResponse> {
    return await this.flipTestService.createBill(req);
  }

}
