'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/helpers/withAuth';
import dynamic from 'next/dynamic';

const Messages = dynamic(() => import('@/containers/messages'));

const MessagesPage = () => {
  return <Messages />;
};

export default withAuth(MessagesPage)([USER_TYPE.USER, USER_TYPE.PROVIDER]);
