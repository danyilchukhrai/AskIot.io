'use client';

import dynamic from 'next/dynamic';

const PhoneLogin = dynamic(() => import('@/containers/phone-login'), { ssr: false });

const PhoneLoginPage = () => {
  return <PhoneLogin />;
};

export default PhoneLoginPage;
