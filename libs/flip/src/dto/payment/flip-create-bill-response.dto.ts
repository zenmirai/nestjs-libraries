import { Type } from "class-transformer";
import { FlipCustomerDto } from "./flip-customer.dto";
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsDateString, IsIn, ValidateNested } from 'class-validator';

export class FlipCreateBillWithCustomerDataResponse {
  
  @IsNumber()
  @IsNotEmpty()
  link_id: number;

  @IsString()
  @IsNotEmpty()
  link_url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['SINGLE'])
  @IsNotEmpty()
  type: 'SINGLE';

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  redirect_url: string;

  @IsDateString()
  @IsNotEmpty()
  expired_date: string;

  @IsString()
  @IsNotEmpty()
  created_from: string;

  @IsEnum(['ACTIVE', 'INACTIVE'])
  @IsNotEmpty()
  status: 'ACTIVE' | 'INACTIVE';

  @IsNumber()
  @IsNotEmpty()
  is_address_required: number;

  @IsNumber()
  @IsNotEmpty()
  is_phone_number_required: number;

  @IsIn([2])
  @IsNumber()
  @IsNotEmpty()
  step: 2;

  @ValidateNested()
  @Type(() => FlipCustomerDto)
  @IsNotEmpty()
  customer: FlipCustomerDto;
}