import FormInput from '@/components/FormComponents/FormInput';
import FormPhoneNumberInput from '@/components/FormComponents/FormPhoneNumberInput';
import { useAuthContext } from '@/providers/AuthProvider';
import { FC } from 'react';

const QuoteVerificationFormDesktop: FC = () => {
  const { user } = useAuthContext();
  return (
    <div className="p-4 md:p-0">
      <div className="mb-5">
        <p className="text-gray-700 text-s mb-2">
          To ensure the integrity of our askIoT marketplace and to fulfill our providers&apos; verification requirements, we need to capture some information from you. This is a one-time request—once verified, you can effortlessly request quotes in the future.
        </p>
      </div>
      <div className="mb-5">
        <FormInput name="firstName" label="First Name" placeholder="First name" />
      </div>
      <div className="mb-5">
        <FormInput name="lastName" label="Last Name" placeholder="Last name" />
      </div>
      <div className="mb-5">
        <FormInput
          name="email"
          label="Email"
          placeholder="Email"
          disabled={user?.email ? true : false}
        />
        <p className="text-xs text-gray-600 mt-1">
          * Your email will be shared with the providers for quote communication.
        </p>
      </div>
      <div className="mb-5">
        <FormPhoneNumberInput
          name="phone"
          label="Phone number"
          placeholder="Phone number"
          disabled={user?.phone ? true : false}
        />
        <p className="text-xs text-gray-600 mt-1">
          📲 OTP will be sent to this number. 
          * Your phone number is required for verification purposes only and will not be shared with third parties or with the providers.
        </p>
      </div>
      <div className="mb-5">
        <FormInput name="website" label="Website" placeholder="Phone website" />
      </div>
    </div>
  );
};

export default QuoteVerificationFormDesktop;
