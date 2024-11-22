export class FlipCreateDisbursementRequest {
  /**
   * The account number of the recipient. 
   * Validation: Numeric
   */
  account_number: string;

  /**
   * Bank code of the recipient bank. 
   * Validation: Accepted values are listed here.
   */
  bank_code: string;

  /**
   * The amount of money to be disbursed. 
   * Validation: Numeric
   */
  amount: number;

  /**
   * Remark to be included in the transfer made to the recipient. 
   * Validation: 1-18 characters, Alphanumeric, Spaces, ., -, /, (, and )
   */
  remark?: string;

  /**
   * City code of the recipient city. 
   * Validation: Accepted values are listed here.
   */
  recipient_city?: number;

  /**
   * List of the recipient emails. 
   * Validation: Alphanumeric with email format (xxx@xxx.xxx), Separate each email with a comma (if any)
   */
  beneficiary_email?: string;


  /**
   * Unique identifier for the request. 
   * Validation: Alphanumeric, 1-50 characters
   */
  idempotency_key: string;

  constructor(args: FlipCreateDisbursementRequest){
    Object.assign(this, args);
  }
}