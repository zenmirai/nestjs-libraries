import { Injectable, Logger } from '@nestjs/common';
import { FlipCreateBillWithCustomerDataRequest, FlipCreateBillWithCustomerDataResponse, FlipCreateDisbursementRequest, FlipCreateDisbursementResponse, FlipService } from 'flip/flip';

@Injectable()
export class FlipTestService {
  private readonly logger = new Logger(FlipTestService.name);

  constructor(private readonly flipService: FlipService) {}

  async getBalance() {
    this.logger.log('Getting Balance');
    return this.flipService.getBalance();
  }

  async createDisbursement(data: FlipCreateDisbursementRequest): Promise<FlipCreateDisbursementResponse> {
    this.logger.log('Creating Disbursement');
    return await this.flipService.createDisbursement(data);
  }

  async createBill(data: FlipCreateBillWithCustomerDataRequest): Promise<FlipCreateBillWithCustomerDataResponse> {
    this.logger.log('Creating Bill');
    return await this.flipService.createBill(data);
  }
}
