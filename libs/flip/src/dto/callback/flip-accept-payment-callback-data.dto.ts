export interface FlipAcceptPaymentCallbackData {
  id: string;
  bill_link_id: number;
  bill_link: string;
  bill_title: string;
  sender_name: string;
  sender_email: string;
  sender_bank: string;
  amount: number;
  status: string;
  created_at: string;
}
