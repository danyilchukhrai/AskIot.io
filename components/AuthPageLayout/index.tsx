'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import Image from 'next/image';
import * as React from 'react';

interface IAuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FunctionComponent<IAuthPageLayoutProps> = (props) => {
  const { user, isFetching } = useAuthContext();
  if (isFetching || user) return props.children;

  return (
    <section className="auth flex md:flex-row flex-col">
      <div className='section-left md:flex md:justify-center md:items-center h-[260px] md:h-screen md:w-[53%] bg-[url("/assets/images/login-image.svg")] bg-no-repeat bg-cover'>
        <div className="content-wrapper py-13.5 px-6 md:py-0 md:px-4">
          <p className="md:max-w-[464px] max-w-[284px] md:text-[2.5rem] text-3xl md:leading-[60px] font-semibold text-white">
            Replace Adventure start here with “AI Co-pilot for IoT”
          </p>
          <div className="flex items-center gap-2 mt-2.5">
            <Image
              src="/assets/images/flolive-logo-image.svg"
              width={64}
              height={35}
              alt="flolive"
            />
            <Image
              src="/assets/images/flolive-email-image.svg"
              width={73}
              height={24}
              alt="flolive"
            />
          </div>
        </div>
      </div>
      <div className="section-right flex-1 md:min-h-screen flex justify-center items-center py-12 px-6.5 md:py-0 md:px-0">
        {props.children}
      </div>
    </section>
  );
};

export default AuthPageLayout;
