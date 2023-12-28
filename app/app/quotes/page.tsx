'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/helpers/withAuth';
import dynamic from 'next/dynamic';

const Quotes = dynamic(() => import('@/containers/quotes'));

const QuotesPage = () => {
  return <Quotes />;
};

export default withAuth(QuotesPage)([USER_TYPE.USER, USER_TYPE.PROVIDER]);
