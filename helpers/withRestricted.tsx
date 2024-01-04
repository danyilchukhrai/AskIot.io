'use client';

import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const withRestricted = (Component: React.FC) => (props: any) => {
  const router = useRouter();
  const [isValidRoute, setIsValidRoute] = useState(false);
  const { isFetching, user } = useAuthContext();

  useEffect(() => {
    if (isFetching) return;
    handleCheckRedirect();
  }, [isFetching]);

  const handleCheckRedirect = async () => {
    if (user) {
      setIsValidRoute(false);
      router.push(RESTRICTED_APP_ROUTES.IOTGPT);
    } else {
      setIsValidRoute(true);
    }
  };

  return isValidRoute ? <Component {...props} /> : null;
};
