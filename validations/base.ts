import { REQUIRED_MESSAGE } from '@/constants/validation';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

export const EMAIL_REGEX = /@[^.]*\./;

export const BASE_VALIDATION = {
  email: Yup.string()
    .required(REQUIRED_MESSAGE)
    .email('Invalid email format')
    .matches(EMAIL_REGEX, 'Invalid email format'),
  phoneNumber: Yup.string().test('phoneNumber', 'Invalid phone number', function (value: any) {
    return isValidPhoneNumber(value);
  }),
};
