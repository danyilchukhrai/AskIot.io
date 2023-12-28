import Button from '@/components/Button';
import Input from '@/components/Input';
import { supabaseClient } from '@/configs/supabase';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-toastify';
import OTPForm from './components/OTPForm';

interface IPhoneNumberLoginProps {}

const PhoneNumberLogin: React.FunctionComponent<IPhoneNumberLoginProps> = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isShowOTPScreen, setIsShowOTPScreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: phoneNumber,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error?.message, {
        className: 'break-all text-base',
      });
    } else {
      setIsShowOTPScreen(true);
    }
  };

  const handleBackToEnterPhoneNumber = () => {
    setIsShowOTPScreen(false);
  };

  return (
    <div className="md:min-h-screen flex flex-col items-center justify-center w-full md:w-2/3">
      <div className="flex items-center">
        <Image className="mr-3.5" src="/assets/logo/logo.svg" alt="AskIoT" width={40} height={40} />
        <Link href="/" className="text-4xl font-['Maven_Pro'] text-black font-medium">
          askIoT
        </Link>
      </div>
      <div className="w-full">
        {isShowOTPScreen ? (
          <OTPForm phoneNumber={phoneNumber} onBack={handleBackToEnterPhoneNumber} />
        ) : (
          <form className="flex flex-col items-center mt-5" onSubmit={handleSendOTP}>
            <Input
              className="w-full"
              value={phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
              label="Phone number"
              placeholder="Enter phone number"
              type="number"
            />
            <Button className="mt-4" disabled={!phoneNumber || isLoading} type="submit">
              Send OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberLogin;
