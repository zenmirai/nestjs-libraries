import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * FlipCreateBillWithCustomerDataRequest create Bill with customer data
 * Customer Only need to choose payment method (NO NEED TO INPUT EMAIL & NAME)
 */
export class FlipCreateBillWithCustomerDataRequest {

  @IsString()
  @IsNotEmpty()
  title: string; // The title of the bill

  @IsIn(['SINGLE'])
  @IsString()
  @IsNotEmpty()
  type: 'SINGLE'; // Bill type
  
  @IsNumber()
  @IsNotEmpty()
  amount: number; // Payment amount, minimum Rp10.000
  
  /**
   * TODO: Validate date format
   * MUST BE FORMATTED: YYYY-MM-DD HH:mm
   */
  @IsString()
  @IsOptional()
  expired_date?: string; // Bill expiry date in format: YYYY-MM-DD HH:mm
  
  /**
   * TODO: Validate URL
   */
  @IsString()
  @IsOptional()
  redirect_url?: string; // Redirect URL after payment is success

  /**
   * @default 0
   */
  @IsIn([0, 1])
  @IsOptional()
  is_address_required?: 0 | 1; // Flag if user needs to input their address
  
  /**
   * @default 0
   */
  @IsIn([0, 1])
  @IsOptional()
  is_phone_number_required?: 0 | 1; // Flag if user needs to input their phone number
  
  @IsIn([2])
  @IsNumber()
  @IsNotEmpty()
  step: 2; // Step for the payment flow
  
  @IsString()
  @IsNotEmpty()
  sender_name: string; // Name of the Customer
  
  @IsString()
  @IsNotEmpty()
  sender_email: string; // Email of the Customer
  
  @IsString()
  @IsOptional()
  sender_phone_number?: string; // Phone number of the Customer
  
  @IsString()
  @IsOptional()
  sender_address?: string; // Address of the Customer
  
  @IsString()
  @IsOptional()
  sender_bank?: string; // Bank that is used for the payment

  @IsIn(['bank_account', 'virtual_account', 'wallet_account', 'online_to_offline_account', 'credit_card_account'])
  @IsString()
  @IsOptional()
  sender_bank_type?: 'bank_account' | 'virtual_account' | 'wallet_account' | 'online_to_offline_account' | 'credit_card_account'; // Type of bank account

  constructor(args: FlipCreateBillWithCustomerDataRequest){
    Object.assign(this, args);
  }
}