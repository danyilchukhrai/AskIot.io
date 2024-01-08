'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const CustomLivePage = dynamic(() => import('@/containers/bot-live'));

const LivePage = () => {
  return <CustomLivePage />;
};

export default withAuth(LivePage)([USER_TYPE.PROVIDER]);
