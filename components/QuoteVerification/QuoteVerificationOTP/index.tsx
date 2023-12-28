import { RefObject } from 'react';
import BackButton from '@/components/BackButton';
import OTPInput, { IOTPInputElement } from '@/components/OTPInput';

interface IOTPFormProps {
  onBack: () => void;
  otpInputRef: RefObject<IOTPInputElement>;
}

const QuoteVerificationOTPForm: React.FunctionComponent<IOTPFormProps> = ({
  onBack,
  otpInputRef,
}) => {
  return (
    <div className="mt-5">
      <BackButton className="self-start" variant="inline" disabledPadding onClick={onBack} />
      <div className="flex flex-col items-center">
        <OTPInput className="mt-5" ref={otpInputRef} />
      </div>
    </div>
  );
};

export default QuoteVerificationOTPForm;
