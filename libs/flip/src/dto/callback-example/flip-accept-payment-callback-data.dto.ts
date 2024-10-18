import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FlipAcceptPaymentCallbackDataExample {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  bill_link_id: number;

  @IsString()
  @IsNotEmpty()
  bill_title: string;

  @IsString()
  @IsNotEmpty()
  sender_name: string;

  @IsString()
  @IsNotEmpty()
  sender_email: string;

  @IsString()
  @IsNotEmpty()
  sender_bank: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;
}
