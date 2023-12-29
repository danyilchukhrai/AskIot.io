'use client';

import dynamic from 'next/dynamic';

const TrainBotPage = dynamic(() => import('@/containers/bot-live/components/TrainBot'));

export default function LivePage() {
  return <TrainBotPage />;
}
