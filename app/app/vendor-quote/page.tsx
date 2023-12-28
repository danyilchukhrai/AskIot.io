'use client';

import dynamic from 'next/dynamic';

const VendorQuote = dynamic(() => import('@/containers/vendor-quote'));

export default function QuoteDetailPage() {
  return <VendorQuote />;
}
