import { REQUIRED_MESSAGE } from '@/constants/validation';
import { VENDOR_ONBOARDING_STEPS } from '@/containers/vendor-onboading';
import * as Yup from 'yup';
import { BASE_VALIDATION } from './base';

export const vendorOnboardingSchema = Yup.object().shape({
  vendorid: Yup.number(),
  step: Yup.number(),
  vendorname: Yup.string().required(REQUIRED_MESSAGE),
  vendorurl: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS;
    },
    then: () => BASE_VALIDATION.url.required(REQUIRED_MESSAGE),
  }),
  notes: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
  phone_number: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS;
    },
    then: (schema) => BASE_VALIDATION.phoneNumber.required(REQUIRED_MESSAGE),
  }),
  email_associated_with_business: Yup.boolean().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
  first_name: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
  last_name: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
  claim_reason: Yup.string().when(['step', 'vendorid'], {
    is: (step: number, vendorid: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS && !vendorid;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
  emails: Yup.array().when(['step', 'isSentEmail'], {
    is: (step: number, isSentEmail: string) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS && isSentEmail === 'false';
    },
    then: (schema) =>
      schema.of(
        Yup.object({
          value: BASE_VALIDATION.email,
        }),
      ),
  }),
  isSentEmail: Yup.boolean().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS;
    },
    then: (schema) => schema.required(REQUIRED_MESSAGE),
  }),
});

export const vendorDeviceSchema = Yup.object().shape({
  product_url: BASE_VALIDATION.url.required(REQUIRED_MESSAGE),
  product_name: Yup.string().required(REQUIRED_MESSAGE),
  key_features: Yup.string().required(REQUIRED_MESSAGE),
  product_description: Yup.string().required(REQUIRED_MESSAGE),
  device_type: Yup.string().required(REQUIRED_MESSAGE),
  industries: Yup.array().min(1, REQUIRED_MESSAGE),
  product_image: Yup.string(),
  specifications: Yup.object().shape({
    network_technology: Yup.string().required(REQUIRED_MESSAGE),
    lte_category_support: Yup.string().required(REQUIRED_MESSAGE),
    sim_type: Yup.string().required(REQUIRED_MESSAGE),
    security_level: Yup.string().required(REQUIRED_MESSAGE),
    ems: Yup.string().required(REQUIRED_MESSAGE),
    mms: Yup.string().required(REQUIRED_MESSAGE),
    fota_client_type: Yup.string().required(REQUIRED_MESSAGE),
    operating_system: Yup.string().required(REQUIRED_MESSAGE),
    dual_sim_type: Yup.string().required(REQUIRED_MESSAGE),
    nat: Yup.array().min(1, REQUIRED_MESSAGE),
    antenna: Yup.string().required(REQUIRED_MESSAGE),
    battery: Yup.string().required(REQUIRED_MESSAGE),
    display_resolution: Yup.string().required(REQUIRED_MESSAGE),
    ethernet_ports: Yup.string().required(REQUIRED_MESSAGE),
    usb_ports: Yup.string().required(REQUIRED_MESSAGE),
    weight: Yup.string().required(REQUIRED_MESSAGE),
    operating_temperature: Yup.string().required(REQUIRED_MESSAGE),
    storage_temperature: Yup.string().required(REQUIRED_MESSAGE),
    relative_humidity: Yup.string().required(REQUIRED_MESSAGE),
    supported_global_markets: Yup.array().min(1, REQUIRED_MESSAGE),
    security_protocol: Yup.array().min(1, REQUIRED_MESSAGE),
    vpn_support: Yup.array().min(1, REQUIRED_MESSAGE),
  }),
  file: Yup.mixed().when('product_image', {
    is: (product_image: string) => !product_image,
    then: (schema) => schema.test('file', REQUIRED_MESSAGE, (value: any) => value?.name),
  }),
});

export const vendorProductSchema = Yup.object().shape({
  product_name: Yup.string().required(REQUIRED_MESSAGE),
  product_description: Yup.string().required(REQUIRED_MESSAGE),
  product_url: BASE_VALIDATION.url.required(REQUIRED_MESSAGE),
  usecase: Yup.string().required(REQUIRED_MESSAGE),
  product_details: Yup.array().min(1, REQUIRED_MESSAGE),
  product_image: Yup.string(),
  file: Yup.mixed().when('product_image', {
    is: (product_image: string) => !product_image,
    then: (schema) => schema.test('file', REQUIRED_MESSAGE, (value: any) => value?.name),
  }),
});

export const updateVendorSchema = Yup.object().shape({
  overview: Yup.string().required(REQUIRED_MESSAGE),
  linkedin: Yup.string().required(REQUIRED_MESSAGE),
  specialties: Yup.string().required(REQUIRED_MESSAGE),
  industry: Yup.string().required(REQUIRED_MESSAGE),
  twitter: Yup.string().required(REQUIRED_MESSAGE),
});

export const providerSettingsSchema = Yup.object().shape({
  leadEmails: Yup.array().when('useUserEmail', {
    is: false,
    then: (schema) =>
      schema.of(
        Yup.object({
          value: BASE_VALIDATION.email,
        }),
      ),
  }),
  useUserEmail: Yup.boolean().required(REQUIRED_MESSAGE),
});
