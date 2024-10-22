import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class FlipTransactionCallbackDataExample {
  @IsInt()
  id: number;

  @IsInt()
  user_id: number;

  @IsNumber()
  amount: number;

  @IsString()
  status: string;

  @IsString()
  reason: string;

  @IsDateString()
  timestamp: string;

  @IsString()
  bank_code: string;

  @IsString()
  account_number: string;

  @IsString()
  recipient_name: string;

  @IsOptional()
  @IsString()
  sender_bank: string | null;

  @IsString()
  remark: string;

  @IsUrl()
  receipt: string;

  @IsDateString()
  time_served: string;

  @IsInt()
  bundle_id: number;

  @IsInt()
  company_id: number;

  @IsInt()
  recipient_city: number;

  @IsString()
  created_from: string;

  @IsString()
  direction: string;

  @IsOptional()
  @IsString()
  sender: string | null;

  @IsNumber()
  fee: number;
}
