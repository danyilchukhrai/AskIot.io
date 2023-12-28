import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import OTPInput, { IOTPInputElement } from '@/components/OTPInput';
import { supabaseClient } from '@/configs/supabase';
import { OTP_LENGTH } from '@/constants/common';
import { OTP_ERROR_MSG } from '@/constants/error-msg';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { useCreateUser } from '@/modules/user/hooks';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface IOTPFormProps {
  phoneNumber: string;
  onBack: () => void;
}

const OTPForm: React.FunctionComponent<IOTPFormProps> = ({ phoneNumber, onBack }) => {
  const otpInputRef = useRef<IOTPInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createUser } = useCreateUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((otpInputRef.current?.getValue()?.length || 0) < OTP_LENGTH) {
      toast.error(OTP_ERROR_MSG);
      return;
    }
    setIsLoading(true);
    const { error, data } = await supabaseClient.auth.verifyOtp({
      phone: phoneNumber,
      token: otpInputRef.current?.getValue() || '',
      type: 'sms',
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (data?.session?.access_token) {
      createUser(data.session.access_token, {
        onError: handleShowError,
        onSuccess: () => {
          window.location.href = RESTRICTED_APP_ROUTES.IOTGPT;
        },
      });
    } else {
      window.location.href = RESTRICTED_APP_ROUTES.IOTGPT;
    }
  };

  return (
    <div className="mt-5">
      <BackButton className="self-start" variant="inline" disabledPadding onClick={onBack} />
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <OTPInput className="mt-5" ref={otpInputRef} />
        <Button className="mt-8" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OTPForm;
