import { IRecommendationInfo } from '../iot-gpt/type';

export interface IVendorOrgDetail {
  organization_name: string;
  organization_website_url: string;
  organization_linkedin_url: string;
  organization_twitter_url: string;
  organization_facebook_url: string;
  organization_phone: string;
  organization_founded_year: string;
  organization_logo_url: string;
  organization_primary_domain: string;
}

export interface IVendorPersonDetail {
  first_name: string;
  last_name: string;
  photo_url: string;
  person_seniority: string;
}

export interface IVendorDetails {
  vendorid: number;
  vendorname: string;
  vendorurl: string;
  logo: string;
  snippet: string;
  title: string;
  orgDetails: IVendorOrgDetail[];
  personDetails: IVendorPersonDetail[];
  vendorlogo: string;
  industries: string;
  specialities: string;
  companyinfo?: string;
  vendorslug: string;
  verified: boolean;
}

export interface ISearchVendorItem {
  vendorid: number;
  vendorname: string;
  logo: string;
  vendorurl: string;
}

export interface ISearchVendorsResponse {
  data: ISearchVendorItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ISearchVendorsQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IClaimVendorBody {
  claimDetails: {
    phone_number: string;
    claim_reason: string;
    email_associated_with_business: string;
    first_name: string;
    last_name: string;
    country_code: string;
    emails?: string[];
  };
}

export interface ICreateVendorBody {
  vendorname?: string;
  vendorurl?: string;
  notes?: string;
  email_associated_with_business: string;
  phone_number: string;
  claim_reason?: string;
  first_name: string;
  last_name: string;
  country_code: string;
}

export interface IProductByVendor extends IRecommendationInfo {
  key_features: {
    description: string;
  };
}

export interface IProductsByVendorResponse {
  products: IProductByVendor[];
  devices: IProductByVendor[];
}

export interface IChatVendorQueryBody {
  vendorId?: number;
  query: string;
  threadId: string;
}

export interface IPublicChatVendorQueryBody extends IChatVendorQueryBody {
  is_email?: boolean;
  'cf-turnstile-response'?: string;
}

export interface IProviderSettingsForm {
  useUserEmail: boolean;
  leadEmails?: {
    value: string;
  }[];
}

export interface IProviderSettingsBody {
  useUserEmail: boolean;
  leadEmails?: string[];
}


