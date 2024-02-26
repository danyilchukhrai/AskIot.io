'use client';

import { withAuth } from '@/HOC/withAuth';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const Bot = dynamic(() => import('@/containers/bot'));

const BotPage = () => {
  return (
    <SubscriptionGuard>
      <Bot />
    </SubscriptionGuard>
  );
};

export default withAuth(BotPage)([USER_TYPE.PROVIDER]);
