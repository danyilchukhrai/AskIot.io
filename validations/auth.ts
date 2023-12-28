import * as Yup from 'yup';
import { BASE_VALIDATION } from './base';
import { REQUIRED_MESSAGE } from '@/constants/validation';

export const loginSchema = Yup.object().shape({
  email: BASE_VALIDATION.email,
  password: Yup.string().required(REQUIRED_MESSAGE),
});

export const signUpSchema = Yup.object()
  .shape({
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), ''],
      'Passwords do not match. Please try again.',
    ),
  })
  .concat(loginSchema);

export const forgotPasswordSchema = Yup.object().shape({
  email: BASE_VALIDATION.email,
});
