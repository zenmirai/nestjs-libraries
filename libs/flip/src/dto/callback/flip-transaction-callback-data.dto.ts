export interface FlipTransactionCallbackData {
  id: number;
  user_id: number;
  amount: number;
  status: string;
  reason: string;
  timestamp: string;
  bank_code: string;
  account_number: string;
  recipient_name: string;
  sender_bank: string | null;
  remark: string;
  receipt: string;
  time_served: string;
  bundle_id: number;
  company_id: number;
  recipient_city: number;
  created_from: string;
  direction: string;
  sender: string | null;
  fee: number;
}