'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';

const QuoteDetail = dynamic(() => import('@/containers/quote-detail'));

const QuoteDetailPage = () => {
  return <QuoteDetail />;
};

export default withAuth(QuoteDetailPage)([USER_TYPE.PROVIDER]);
