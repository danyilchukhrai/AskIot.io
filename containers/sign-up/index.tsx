import Button from '@/components/Button';
import FormCheckBox from '@/components/FormComponents/FormCheckbox';
import FormInput from '@/components/FormComponents/FormInput';
import FormPasswordInput from '@/components/FormComponents/FormPasswordInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import Turnstile, { ITurnstileElement } from '@/components/Turnstile';
import { AUTH_ENDPOINTS } from '@/constants/api-endpoints';
import { AUTH_ROUTES } from '@/constants/routes';
import { ISignUpForm } from '@/types/auth';
import { signUpSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ISignUpProps {}

const SignUp: FC<ISignUpProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const turnstileRef = useRef<ITurnstileElement>(null);

  const form = useForm<ISignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      captchaToken: '',
      isAgreeTerms: false,
    },
    resolver: yupResolver(signUpSchema),
    mode: 'onSubmit',
  });

  const handleSignUp = async (data: ISignUpForm) => {
    const { email, password, captchaToken } = data;

    setIsLoading(true);
    const res = await fetch(AUTH_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ email, password, captchaToken }),
    });
    const { message, error } = (await res.json()) || {};

    if (res.status === 200) {
      toast.success(message);
      form.reset();
      turnstileRef.current?.reset();
    } else {
      toast.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="login-form-container w-full md:w-[53%] md:min-w-[325px]">
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
          <form className="form flex flex-col gap-5" onSubmit={form.handleSubmit(handleSignUp)}>
            <FormInput name="email" placeholder="you@example.com" label="Email" />
            <FormPasswordInput name="password" label="Password" />
            <FormPasswordInput name="confirmPassword" label="Confirm Password" />
            <Turnstile
              ref={turnstileRef}
              onSuccess={(token) => {
                form.setValue('captchaToken', token);
              }}
              errorMessage={form.formState.errors?.captchaToken?.message}
            />
            <div>
              <FormCheckBox
                name="isAgreeTerms"
                label={`
                  <p class='text-base'>
                    I agree to the <a class='text-primary-500' href='/terms' target="_blank">Terms of Service</a> 
                    and 
                    <a class='text-primary-500' href='/privacy' target="_blank">Privacy Policy</a>.
                  </p>
                `}
              />
              <p className="text-base text-gray-700 pl-[21px] pt-2 leading-[18px]">
                This form is protected by Turnstile.{' '}
                <Link
                  className="text-primary-500"
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                >
                  Cloudflare's Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  className="text-primary-500"
                  href="https://www.cloudflare.com/website-terms/"
                  target="_blank"
                >
                  Cloudflare's Terms of Service
                </Link>{' '}
                apply.
              </p>
            </div>
            <Button fullWidth variant="info" isLoading={isLoading}>
              Sign Up
            </Button>
          </form>
        </FormProvider>
        <p className="md:text-center text-s mt-9 self-start">
          <span className="text-black">Have an account?</span>
          <Link className="text-primary-500" href={AUTH_ROUTES.LOGIN} replace>
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
