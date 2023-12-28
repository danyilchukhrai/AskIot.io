import Button from '@/components/Button';
import CloseButtonMobile from '@/components/CloseButtonMobile';
import { FC, RefObject } from 'react';
import { useForm } from 'react-hook-form';
import QuoteVerificationFormDesktop from '../QuoteVerificationFormDesktop';
import Image from 'next/image';
import { IOTPInputElement } from '@/components/OTPInput';
import QuoteVerificationOTPForm from '../QuoteVerificationOTP';

interface IAddToQuoteMobileProps {
  onClose: () => void;
  onSubmit: () => void;
  isShowOTPForm: boolean;
  otpInputRef: RefObject<IOTPInputElement>;
  onOTPFormBack: () => void;
}

const QuoteVerificationFormMobile: FC<IAddToQuoteMobileProps> = ({
  onClose,
  onSubmit,
  isShowOTPForm,
  otpInputRef,
  onOTPFormBack,
}) => {
  const form = useForm();
  return (
    <div className="h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray z-20 flex flex-col">
      <div className="bg-white p-4 flex justify-end items-center">
        <CloseButtonMobile onClick={onClose}>
          <Image
            className="object-contain"
            width={24}
            height={24}
            src="/assets/icons/x-mark-icon.svg"
            alt=""
          />
        </CloseButtonMobile>
      </div>
      {isShowOTPForm ? (
        <div className="px-2">
          <QuoteVerificationOTPForm otpInputRef={otpInputRef} onBack={onOTPFormBack} />
        </div>
      ) : (
        <QuoteVerificationFormDesktop />
      )}

      <div className="footer flex flex-col gap-4 absolute bottom-4 right-4 left-4">
        <Button variant="secondary" fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuoteVerificationFormMobile;
