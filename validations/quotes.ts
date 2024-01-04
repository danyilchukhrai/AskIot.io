import * as Yup from 'yup';
import { REQUIRED_MESSAGE } from '@/constants/validation';

export const requestQuoteSchema = Yup.object().shape({
  quantity: Yup.number()
    .required(REQUIRED_MESSAGE)
    .min(1, 'Quantity must be greater than 0')
    .max(100, 'Quantity must be less than 100.'),
  notes: Yup.string(),
  requestedByDate: Yup?.date().required(REQUIRED_MESSAGE),
});

export const quoteVerificationSchema = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED_MESSAGE).min(1, 'Quantity must be greater than 0'),
  lastName: Yup.string().required(REQUIRED_MESSAGE),
  email: Yup.string().required(REQUIRED_MESSAGE).email(),
  phone: Yup.string().required(REQUIRED_MESSAGE),
});

export const submitQuoteSchema = Yup.object().shape({
  offeredPrice: Yup.number().required(REQUIRED_MESSAGE),
  vendorNotes: Yup.string().required(REQUIRED_MESSAGE),
});
