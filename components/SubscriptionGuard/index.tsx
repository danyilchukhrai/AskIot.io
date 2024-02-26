'use client';

import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useUserContext } from '@/providers/UserProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';

interface ISubscriptionGuardProps {
  children: ReactNode;
}

const SubscriptionGuard: FC<ISubscriptionGuardProps> = ({ children }) => {
  const { isNoPaymentStatus } = useUserContext();
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const lastPath = pathname.split('/').pop();
  const sessionId = params.get('session_id');
  const isSuccess = Boolean(sessionId) && lastPath === 'success';

  useEffect(() => {
    if (isNoPaymentStatus && !isSuccess) {
      router.push(RESTRICTED_APP_ROUTES.BOT_SUBSCRIPTION);
    }
  }, [isSuccess, isNoPaymentStatus]);

  if (typeof isNoPaymentStatus !== 'boolean' || (isNoPaymentStatus && !isSuccess)) return null;

  return children;
};

export default SubscriptionGuard;
