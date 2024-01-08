'use client';

import { withRestricted } from '@/HOC/withRestricted';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@/containers/sign-up'), { ssr: false });

const SignUpPage = () => {
  return <SignUp />;
};

export default withRestricted(SignUpPage);
