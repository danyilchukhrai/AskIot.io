'use client';

import { USER_TYPE, routeConfig } from '@/configs/routeConfig';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const withAuth = (Component: React.FC) => (allowedRoles: USER_TYPE[]) => (props: any) => {
  const router = useRouter();
  const [isValidRoute, setIsValidRoute] = useState(false);
  const { currentUserType, allowedUserTypes, isCheckingProviderStatus } = useUserTypeContext();
  const { isFetching: isFetchingUserInfo, user } = useAuthContext();

  useEffect(() => {
    if (isFetchingUserInfo || isCheckingProviderStatus) return;
    handleCheckPermission();
  }, [isFetchingUserInfo, isCheckingProviderStatus, allowedUserTypes, user]);

  const handleCheckPermission = async () => {
    if (user && !allowedRoles.some((it) => allowedUserTypes.includes(it))) {
      setIsValidRoute(false);
      setTimeout(() => {
        router.push(routeConfig[currentUserType].default);
      }, 300);
    } else if (!user) {
      setIsValidRoute(false);
      setTimeout(() => {
        router.push(routeConfig.auth.default);
      }, 300);
    } else setIsValidRoute(true);
  };

  return isValidRoute ? <Component {...props} /> : null;
};
