'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormPasswordInput from '@/components/FormComponents/FormPasswordInput';
import { supabaseClient } from '@/configs/supabase';
import { AUTH_ENDPOINTS } from '@/constants/api-endpoints';
import { COOKIES_STORAGE_KEYS } from '@/constants/common';
import { AUTH_ROUTES, RESTRICTED_APP_ROUTES } from '@/constants/routes';
import * as CookiesStorageService from '@/helpers/storage';
import { loginSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ISignInProps {}

interface ISignInForm {
  email: string;
  password: string;
}

type SocialLoginProviderType = 'github' | 'google' | 'linkedin_oidc';

const SOCIAL_LOGIN_DATA: { icon: string; provider: SocialLoginProviderType }[] = [
  {
    icon: '/assets/icons/google-icon.svg',
    provider: 'google',
  },
  // {
  //   icon: '/assets/icons/github-icon.svg',
  //   provider: 'github',
  // },
  {
    icon: '/assets/icons/linked-in-login-icon.svg',
    provider: 'linkedin_oidc',
  },
];

const SignIn: FC<ISignInProps> = (props) => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ISignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });
  const router = useRouter();

  const handleSignIn = async ({ email, password }: ISignInForm) => {
    setIsLoading(true);
    const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { error, accessToken } = (await res.json()) || {};
    setIsLoading(false);

    if (accessToken) {
      CookiesStorageService.setValue(COOKIES_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    }

    if (error) {
      toast.error(error);
    } else if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.location.href = RESTRICTED_APP_ROUTES.IOTGPT;
    }
  };

  const handleSocialLogin = async (provider: SocialLoginProviderType) => {
    let options: any = {
      redirectTo: `${window.location.origin}/api/auth/callback/`,
    };

    if (provider === 'google') {
      options = {
        ...options,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      };
    }

    supabaseClient.auth.signInWithOAuth({
      provider,
      options,
    });
  };

  return (
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
        <p className="text-gray-700 text-base mt-[11px]">Sign in to your account</p>
      </div>
      <FormProvider {...form}>
        <form className="form flex flex-col gap-8" onSubmit={form.handleSubmit(handleSignIn)}>
          <FormInput name="email" placeholder="you@example.com" label="Email" />
          <div className="w-full">
            <FormPasswordInput name="password" label="Password" />
            <Link className="text-gray-600 text-xs mt-2" href={AUTH_ROUTES.FORGOT_PASSWORD}>
              Forget password?
            </Link>
          </div>
          <Button
            onClick={form.handleSubmit(handleSignIn)}
            fullWidth
            variant="info"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
      <div className="login-footer mt-4.5 flex flex-col items-center">
        <p className="text-black flex items-center text-s before:content-[''] before:inline-block before:h-[1px] before:bg-gray-200 before:flex-1 after:content-[''] after:inline-block after:h-[1px] after:bg-gray-200 after:flex-1 before:mr-2 after:ml-2 mb-4.5 w-full lowercase md:capitalize">
          Or
        </p>
        <ul className="socials flex items-center gap-[19px] mb-9">
          {SOCIAL_LOGIN_DATA.map((it, index) => (
            <li key={index}>
              <div
                className="hover:cursor-pointer w-[55px] h-[55px] bg-gray-100 rounded-full flex items-center justify-center"
                onClick={() => handleSocialLogin(it.provider)}
              >
                <Image src={it.icon} width={24} height={24} alt="icon" />
              </div>
            </li>
          ))}
          <li>
            <div
              className="hover:cursor-pointer w-[55px] h-[55px] bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => router.push(AUTH_ROUTES.PHONE_LOGIN)}
            >
              <Image src="/assets/icons/phone-login-icon.svg" width={24} height={24} alt="icon" />
            </div>
          </li>
        </ul>
        <p className="md:text-center text-s self-start">
          <span className="text-black">Don’t have an account? </span>
          <Link className="text-primary-500" href={AUTH_ROUTES.SIGN_UP}>
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
