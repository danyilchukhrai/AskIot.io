'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BotPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(RESTRICTED_APP_ROUTES.BOT);
  }, []);

  return null;
};

export default withAuth(BotPage)([USER_TYPE.PROVIDER]);
