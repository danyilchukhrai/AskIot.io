import FormInput from '@/components/FormComponents/FormInput';
import { useAuthContext } from '@/providers/AuthProvider';
import { FC } from 'react';

const QuoteVerificationFormDesktop: FC = () => {
  const { user } = useAuthContext();
  return (
    <div className="p-4 md:p-0">
      <div className="mb-5">
        <p className="text-gray-700 text-s mb-2">
          Before you can submit your quote, we need to capture some information
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
      </div>
      <div className="mb-5">
        <FormInput
          name="phone"
          label="Phone number"
          placeholder="Phone number"
          disabled={user?.phone ? true : false}
        />
      </div>
      <div className="mb-5">
        <FormInput name="website" label="Website" placeholder="Phone website" />
      </div>
    </div>
  );
};

export default QuoteVerificationFormDesktop;
