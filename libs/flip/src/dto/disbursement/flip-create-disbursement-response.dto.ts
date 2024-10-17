import { DisbursementStatus } from "../../constant";
import { CreatedFrom } from "../../constant/created-from.enum";
import { Direction } from "../../constant/direction.enum";
import { DisbursementReason } from "../../constant/disbursement/disbursement-reason.enum";

export interface Sender {
  // TODO: Sender
}

export class FlipCreateDisbursementResponse {
  id: string;
  user_id: string;
  amount: number;
  status: DisbursementStatus;
  reason?: DisbursementReason;
  timestamp: string;
  bank_code: string;
  account_number: string;
  recipient_name: string;
  sender_bank: string;
  remark: string;
  receipt?: string;
  time_served?: string;
  bundle_id: number;
  company_id: string;
  recipient_city: string;
  created_from: CreatedFrom;
  direction: Direction;
  sender?: Sender;
  fee: number;
  beneficiary_email: string[];
  idempotency_key: string;
}