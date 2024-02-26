import { REQUIRED_MESSAGE } from '@/constants/validation';
import * as Yup from 'yup';
import { BASE_VALIDATION } from './base';

export const loginSchema = Yup.object().shape({
  email: BASE_VALIDATION.email,
  password: Yup.string().required(REQUIRED_MESSAGE),
  captchaToken: Yup.string().required(REQUIRED_MESSAGE),
});

export const signUpSchema = Yup.object()
  .shape({
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match. Please try again.')
      .required(REQUIRED_MESSAGE),
    isAgreeTerms: Yup.boolean()
      .required(REQUIRED_MESSAGE)
      .test('isAgreeTerms', REQUIRED_MESSAGE, (value: any) => !!value),
  })
  .concat(loginSchema);

export const forgotPasswordSchema = Yup.object().shape({
  email: BASE_VALIDATION.email,
  captchaToken: Yup.string().required(REQUIRED_MESSAGE),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required(REQUIRED_MESSAGE),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords do not match. Please try again.')
    .required(REQUIRED_MESSAGE),
  captchaToken: Yup.string().required(REQUIRED_MESSAGE),
});
