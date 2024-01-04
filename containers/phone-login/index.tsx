import Button from '@/components/Button';
import FormPhoneNumberInput from '@/components/FormComponents/FormPhoneNumberInput';
import { supabaseClient } from '@/configs/supabase';
import { REQUIRED_MESSAGE } from '@/constants/validation';
import { BASE_VALIDATION } from '@/validations/base';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import OTPForm from './components/OTPForm';

interface IPhoneNumberLoginProps {}

const PhoneNumberLogin: React.FunctionComponent<IPhoneNumberLoginProps> = (props) => {
  const [isShowOTPScreen, setIsShowOTPScreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        phone_number: BASE_VALIDATION.phoneNumber.required(REQUIRED_MESSAGE),
      }),
    ),
    mode: 'onChange',
  });
  const phoneNumber = form.watch('phone_number');

  const handleSendOTP = async (data: any) => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: data?.phone_number,
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
          <form
            className="flex flex-col items-center mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSendOTP)();
            }}
          >
            <FormProvider {...form}>
              <div className="w-full">
                <FormPhoneNumberInput
                  name="phone_number"
                  className="w-full"
                  placeholder="Enter phone number"
                  label="Phone number"
                />
              </div>
            </FormProvider>

            <Button className="mt-4" disabled={!form.formState.isValid || isLoading} type="submit">
              Send OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberLogin;
