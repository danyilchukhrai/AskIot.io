'use client';

import { withAuth } from '@/HOC/withAuth';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const AddLinksPage = dynamic(() => import('@/containers/bot-live/components/AddLinks'));

const LinkPage = () => {
  return (
    <SubscriptionGuard>
      <AddLinksPage />
    </SubscriptionGuard>
  );
};

export default withAuth(LinkPage)([USER_TYPE.PROVIDER]);
