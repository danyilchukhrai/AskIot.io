'use client';

import dynamic from 'next/dynamic';

const Vendors = dynamic(() => import('@/containers/vendors'));

export default function VendorsPage() {
  return <Vendors />;
}
