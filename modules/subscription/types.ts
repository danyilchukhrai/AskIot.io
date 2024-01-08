export type CheckoutSessionType = 'vendor_onboarding' | 'access_bot';
export type CheckoutEnvType = 'staging';
export interface ICreateCheckoutSessionBody {
  type: CheckoutSessionType;
  env: CheckoutEnvType;
}
