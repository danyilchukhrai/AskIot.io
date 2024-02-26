'use client';

import dynamic from 'next/dynamic';

const ForgotPassword = dynamic(() => import('@/containers/forgot-password'), { ssr: false });

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
