'use client';

import dynamic from 'next/dynamic';

const CustomLivePage = dynamic(() => import('@/containers/bot-live'));

export default function LivePage() {
  return <CustomLivePage />;
}
