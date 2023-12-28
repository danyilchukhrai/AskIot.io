'use client';

import dynamic from 'next/dynamic';

const VendorDetail = dynamic(() => import('@/containers/vendor-detail'));

export default function VendorsPage() {
  return <VendorDetail />;
}
