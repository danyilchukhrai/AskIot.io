export interface IAskIOTUserDetails {
  user_id: string;
  is_provider: boolean;
  provider_status: string;
  phone_number: string;
  claim_reason: string;
  email_associated_with_business: boolean;
  first_name: string;
  last_name: string;
  is_mobile_verified: boolean;
}

export interface IUserQuoteSnippets {
  quote_id: number;
  product_id: number;
  type: string;
  status: string;
}
