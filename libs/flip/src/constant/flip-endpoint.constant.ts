const FLIP_BASE_URL = `https://bigflip.id/big_sandbox_api`

export const flipEndpoint = {

  general: {
    /**
     * GET https://bigflip.id/api/v2/general/balance
     */
    balance: `${FLIP_BASE_URL}/v2/general/balance`,

    /**
     * GET https://bigflip.id/api/v2/general/banks?code=bank_code
     */
    bankInfo: `${FLIP_BASE_URL}/v2/general/banks`,
    
    /**
     * GET https://bigflip.id/api/v2/general/maintenance
     */
    isMaintenance: `${FLIP_BASE_URL}/v2/general/maintenance`,

    /**
     * POST https://bigflip.id/api/v2/disbursement/bank-account-inquiry
     */
    bankAccountInquiry: `${FLIP_BASE_URL}/v2/general/bank-account-inquiry`
  },
  disbursement: {
    create: `${FLIP_BASE_URL}/v3/disbursement`,

    /**
     * GET ${FLIP_BASE_URL}/disbursement?pagination=pagination&page=page&sort=sort&attribute=value
     */
    paginate: `${FLIP_BASE_URL}/v3/disbursement`,

    /**
     * GET ${FLIP_BASE_URL}/get-disbursement?idempotency-key=idempotency_key
     */
    getByIdempotencyKey: `${FLIP_BASE_URL}/v3/get-disbursement`,

    /**
     * GET ${FLIP_BASE_URL}/get-disbursement?id=id
     */
    getById: `${FLIP_BASE_URL}/v3/get-disbursement`
  },
  bill: {
    /**
     * POST https://bigflip.id/api/v2/pwf/bill
     */
    create: `${FLIP_BASE_URL}/v2/pwf/bill`,
  }
}