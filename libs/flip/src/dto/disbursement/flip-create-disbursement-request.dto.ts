export class FlipCreateDisbursementRequest {
  account_number: string; // The account number of the recipient. Validation: Numeric
  bank_code: string; // Bank code of the recipient bank. Validation: Accepted values are listed here.
  amount: number; // The amount of money to be disbursed. Validation: Numeric
  remark?: string; // Remark to be included in the transfer made to the recipient. Validation: 1-18 characters, Alphanumeric, Spaces, ., -, /, (, and )
  recipient_city?: number; // City code of the recipient city. Validation: Accepted values are listed here.
  beneficiary_email?: string; // List of the recipient emails. Validation: Alphanumeric with email format (xxx@xxx.xxx), Separate each email with a comma (if any)

  idempotency_key: string; // Unique identifier for the request. Validation: Alphanumeric, 1-50 characters

  constructor(args: FlipCreateDisbursementRequest){
    Object.assign(this, args);
  }
}