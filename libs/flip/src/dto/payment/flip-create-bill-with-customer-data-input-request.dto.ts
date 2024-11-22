/**
 * Class that guide data type when wanna create bill with costumer
 */
export class FlipCreateBillWithCustomerDataRequest {

  /**
   * The title of the bill
   */
  title: string;

  /**
   * Bill type
   */
  type: 'SINGLE';
  
  /**
   * Payment amount, minimum Rp10.000
   */
  amount: number; 
  
  /**
   * Bill expiry date in format: YYYY-MM-DD HH:mm
   */
  expired_date?: string;
  
  /**
   *  Redirect URL after payment is success
   */
  redirect_url?: string;

  /**
   * Flag if user needs to input their address
   */
  is_address_required?: 0 | 1;
  
  /**
   * Flag if user needs to input their phone number
   */
  is_phone_number_required?: 0 | 1;
  
  /**
   * Step for the payment flow
   */
  step: 2;
  
  /**
   * Name of the Customer
   */
  sender_name: string;
  
  /**
   * Email of the Customer
   */
  sender_email: string;
  
  /**
   * Phone number of the Customer
   */
  sender_phone_number?: string;
  
  /**
   * Address of the Customer
   */
  sender_address?: string; 
  

  /**
   * Bank that is used for the payment
   */
  sender_bank?: string;

  /**
   * Type of bank account
   */
  sender_bank_type?: 'bank_account' | 'virtual_account' | 'wallet_account' | 'online_to_offline_account' | 'credit_card_account';

  constructor(args: FlipCreateBillWithCustomerDataRequest){
    Object.assign(this, args);
  }
}