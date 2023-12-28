'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { routeConfig } from '@/configs/routeConfig';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { useAuthContext } from '@/providers/AuthProvider';

export const withRestricted = (Component: React.FC) => (props: any) => {
  const router = useRouter();
  const [isValidRoute, setIsValidRoute] = useState(false);
  const { currentUserType } = useUserTypeContext();
  const { isFetching, user } = useAuthContext();

  useEffect(() => {
    if (isFetching) return;
    handleCheckRedirect();
  }, [isFetching]);

  const handleCheckRedirect = async () => {
    if (user) {
      setIsValidRoute(false);
      router.push(routeConfig[currentUserType].default);
    } else {
      setIsValidRoute(true);
    }
  };

  return isValidRoute ? <Component {...props} /> : null;
};
