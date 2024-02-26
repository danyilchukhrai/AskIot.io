import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import Turnstile, { ITurnstileElement } from '@/components/Turnstile';
import { supabaseClient } from '@/configs/supabase';
import { AUTH_ROUTES } from '@/constants/routes';
import { IForgotPasswordForm } from '@/types/auth';
import { forgotPasswordSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IForgotPasswordProps {}

const ForgotPassword: FC<IForgotPasswordProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const turnstileRef = useRef<ITurnstileElement>(null);
  const form = useForm<IForgotPasswordForm>({
    defaultValues: {
      email: '',
      captchaToken: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onSubmit',
  });

  const handleResetEmail = async ({ email, captchaToken }: IForgotPasswordForm) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${AUTH_ROUTES.RESET_PASSWORD}`,
      captchaToken,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error?.message);
    } else {
      toast.success('Success! Check your email to reset your password');
      form.reset();
      turnstileRef.current?.reset();
    }
  };

  return (
    <>
      <div className="forgot-password-form w-full md:w-[48%]">
        <div className="login-header flex flex-col justify-center items-center mb-11">
          <div className="flex items-center">
            <Image
              className="mr-3.5"
              src="/assets/logo/logo.svg"
              alt="AskIoT"
              width={40}
              height={40}
            />
            <Link href="/" className="text-4xl font-['Maven_Pro'] text-black font-medium">
              askIoT
            </Link>
          </div>
          <p className="text-gray-700 text-base mt-[11px]">
            Type in your email and we'll send you a link to reset your password
          </p>
        </div>
        <FormProvider {...form}>
          <form className="form flex flex-col gap-8" onSubmit={form.handleSubmit(handleResetEmail)}>
            <FormInput name="email" placeholder="you@example.com" label="Email" />
            <Turnstile
              ref={turnstileRef}
              onSuccess={(token) => {
                form.setValue('captchaToken', token);
                form.trigger('captchaToken');
              }}
              errorMessage={form.formState?.errors?.captchaToken?.message}
            />
            <Button fullWidth variant="info" isLoading={isLoading}>
              Send Reset Email
            </Button>
          </form>
        </FormProvider>
        <p className="text-center text-s mt-9">
          <span className="text-black">Have an account?</span>
          <Link className="text-primary-500" href={AUTH_ROUTES.LOGIN}>
            {' '}
            Sign In Now
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
