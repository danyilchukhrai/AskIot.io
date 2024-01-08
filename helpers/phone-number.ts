import { parsePhoneNumber } from 'react-phone-number-input';

export const parseAskIoTPhoneNumber = (
  input: string,
): {
  phoneCode: string;
  nationalNumber: string;
} => {
  const phoneNumber = parsePhoneNumber(input);

  return {
    phoneCode: `+${phoneNumber?.countryCallingCode}`,
    nationalNumber: phoneNumber?.nationalNumber || input,
  };
};
