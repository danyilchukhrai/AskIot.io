'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const BotMessage = dynamic(() => import('@/containers/bot-message'), { ssr: false });

const BotMessagePage = () => {
  return <BotMessage />;
};

export default withAuth(BotMessagePage)([USER_TYPE.USER]);
