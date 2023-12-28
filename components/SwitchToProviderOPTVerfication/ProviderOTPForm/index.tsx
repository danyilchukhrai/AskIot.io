import { RefObject } from 'react';
import OTPInput, { IOTPInputElement } from '@/components/OTPInput';

interface IProviderOTPForm {
  otpInputRef: RefObject<IOTPInputElement>;
}

const ProviderOTPForm: React.FunctionComponent<IProviderOTPForm> = ({ otpInputRef }) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <OTPInput className="mt-2 mb-6" ref={otpInputRef} />
      </div>
    </div>
  );
};

export default ProviderOTPForm;
