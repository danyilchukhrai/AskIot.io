import Button from '@/components/Button';
import FormPasswordInput from '@/components/FormComponents/FormPasswordInput';
import Turnstile from '@/components/Turnstile';
import { supabaseClient } from '@/configs/supabase';
import { AUTH_ROUTES } from '@/constants/routes';
import { IResetPasswordForm } from '@/types/auth';
import { resetPasswordSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IResetPasswordProps {}

const ResetPassword: FC<IResetPasswordProps> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<IResetPasswordForm>({
    defaultValues: {
      confirmPassword: '',
      password: '',
      captchaToken: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onResetPassword = async (data: IResetPasswordForm) => {
    setIsLoading(true);
    const { data: resetData, error } = await supabaseClient.auth.updateUser({
      password: data.password,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error?.message);
    } else {
      toast.success('Success! Please try logging in ');
      router.push(AUTH_ROUTES.LOGIN);
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
        </div>
        <FormProvider {...form}>
          <form className="form flex flex-col gap-8" onSubmit={form.handleSubmit(onResetPassword)}>
            <FormPasswordInput
              name="password"
              placeholder="Enter your new password"
              label="Enter your new password"
            />
            <FormPasswordInput
              name="confirmPassword"
              placeholder="Enter your confirm password"
              label="Enter your confirm password"
            />
            <Turnstile
              onSuccess={(token) => {
                form.setValue('captchaToken', token);
                form.trigger('captchaToken');
              }}
              errorMessage={form.formState?.errors?.captchaToken?.message}
            />
            <Button fullWidth variant="info" isLoading={isLoading}>
              Confirm
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

export default ResetPassword;
