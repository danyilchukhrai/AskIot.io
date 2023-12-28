'use client';

import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/containers/home'));

export default function HomePage() {
  return <Home />;
}
