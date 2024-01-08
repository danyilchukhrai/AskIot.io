import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormPasswordInput from '@/components/FormComponents/FormPasswordInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import { AUTH_ENDPOINTS } from '@/constants/api-endpoints';
import { AUTH_ROUTES } from '@/constants/routes';
import { ISignUpForm } from '@/types/auth';
import { signUpSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ISignUpProps {}

const SignUp: FC<ISignUpProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ISignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
    mode: 'onSubmit',
  });

  const handleSignUp = async (data: ISignUpForm) => {
    const { email, password } = data;
    setIsLoading(true);
    const res = await fetch(AUTH_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { message, error } = (await res.json()) || {};

    if (res.status === 200) {
      toast.success(message);
      form.reset();
    } else {
      toast.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="login-form-container w-full md:w-[48%] md:min-w-[325px]">
        <div className="login-header flex flex-col justify-center md:items-center mb-11">
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
          <p className="text-gray-700 text-base mt-[11px]">Create a new account</p>
        </div>
        <FormProvider {...form}>
          <form className="form flex flex-col gap-8" onSubmit={form.handleSubmit(handleSignUp)}>
            <FormInput name="email" placeholder="you@example.com" label="Email" />
            <FormPasswordInput name="password" label="Password" />
            <FormPasswordInput name="confirmPassword" label="Confirm Password" />
            <Button fullWidth variant="info" isLoading={isLoading}>
              Sign Up
            </Button>
          </form>
        </FormProvider>
        <p className="md:text-center text-s mt-9 self-start">
          <span className="text-black">Have an account?</span>
          <Link className="text-primary-500" href={AUTH_ROUTES.LOGIN}>
            {' '}
            Sign In Now
          </Link>
        </p>
      </div>
      <LoadingIndicator isLoading={isLoading} />
    </>
  );
};

export default SignUp;
