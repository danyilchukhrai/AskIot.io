import { DOMAIN_REGEX } from '@/constants/regex';
import { REQUIRED_MESSAGE } from '@/constants/validation';
import { VENDOR_ONBOARDING_STEPS } from '@/containers/vendor-onboading';
import * as Yup from 'yup';

export const vendorOnboardingSchema = Yup.object().shape({
  vendorid: Yup.number(),
  step: Yup.number(),
  vendorname: Yup.string().required(REQUIRED_MESSAGE),
  vendorurl: Yup.string().when('step', {
    is: (step: number) => {
      return step === VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS;
    },
    then: (schema) =>
      schema.required(REQUIRED_MESSAGE).test('vendorurl', 'Url is invalid', (value) => {
        return DOMAIN_REGEX.test(value);
      }),
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
    then: (schema) => schema.required(REQUIRED_MESSAGE),
    // .test('phone_number', 'Invalid phone number', (value) => {
    //   return value.length === 12;
    // }),
  }),
  email_associated_with_business: Yup.string().when('step', {
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
});
