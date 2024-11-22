import { FlipCustomerDto } from "./flip-customer.dto";

export class FlipCreateBillWithCustomerDataResponse {
  link_id: number;

  link_url: string;

  title: string;

  type: 'SINGLE';

  amount: number;

  redirect_url: string;

  expired_date: string;

  created_from: string;

  status: 'ACTIVE' | 'INACTIVE';

  is_address_required: number;

  is_phone_number_required: number;

  step: 2;

  customer: FlipCustomerDto;
}