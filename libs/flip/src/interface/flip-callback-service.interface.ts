import {
  FlipAcceptPaymentCallbackRequest,
  FlipBankInquiryCallbackRequest,
  FlipTransactionCallbackRequest,
} from '../dto';

export interface FlipCallbackServiceInterface {
  handleAcceptPaymentCallback(data: FlipAcceptPaymentCallbackRequest);

  /**
   * Also known as disbursement
   */
  handleTransactionCallback(data: FlipTransactionCallbackRequest);

  handleBankInquiryCallback(data: FlipBankInquiryCallbackRequest);
}
