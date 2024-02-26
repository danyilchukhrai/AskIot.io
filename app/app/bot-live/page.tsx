'use client';

import { withAuth } from '@/HOC/withAuth';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const CustomLivePage = dynamic(() => import('@/containers/bot-live'));

const LivePage = () => {
  return (
    <SubscriptionGuard>
      <CustomLivePage />
    </SubscriptionGuard>
  );
};

export default withAuth(LivePage)([USER_TYPE.PROVIDER]);
