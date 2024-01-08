'use client';

import dynamic from 'next/dynamic';

const QuoteDetail = dynamic(() => import('@/containers/quote-detail'));

const QuoteDetailPage = () => {
  return <QuoteDetail />;
};

export default QuoteDetailPage;
