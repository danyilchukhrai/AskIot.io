import { PLAN_TERM } from '@/constants/subscription';

export type CheckoutSessionType = 'vendor_onboarding' | 'access_bot';
export interface ICreateCheckoutSessionBody {
  type: CheckoutSessionType;
  env: string;
  planName: string;
  term: PLAN_TERM;
}
