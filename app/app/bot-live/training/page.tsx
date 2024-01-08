'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const TrainBotPage = dynamic(() => import('@/containers/bot-live/components/TrainBot'));

const LivePage = () => {
  return <TrainBotPage />;
};

export default withAuth(LivePage)([USER_TYPE.PROVIDER]);
