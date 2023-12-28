'use client';

import dynamic from 'next/dynamic';

const Bot = dynamic(() => import('@/containers/bot'));

export default function BotPage() {
  return <Bot />;
}
