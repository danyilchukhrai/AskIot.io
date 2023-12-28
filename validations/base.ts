import { REQUIRED_MESSAGE } from '@/constants/validation';
import * as Yup from 'yup';

export const EMAIL_REGEX = /@[^.]*\./;

export const BASE_VALIDATION = {
  email: Yup.string()
    .required(REQUIRED_MESSAGE)
    .email('Invalid email format')
    .matches(EMAIL_REGEX, 'Invalid email format'),
};
