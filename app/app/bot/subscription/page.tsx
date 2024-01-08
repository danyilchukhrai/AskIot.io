'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const Subscription = dynamic(() => import('@/containers/subscription'));

const SubscriptionPage = () => {
  return <Subscription />;
};

export default withAuth(SubscriptionPage)([USER_TYPE.PROVIDER]);
