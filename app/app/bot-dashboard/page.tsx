'use client';

import dynamic from 'next/dynamic';

const BotDashboard = dynamic(() => import('@/containers/bot-dashboard'));

export default function BotDashboardPage() {
  return <BotDashboard />;
}