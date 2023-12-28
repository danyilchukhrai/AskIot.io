import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('@/containers/landing'));

export default function LandingPage() {
  return <Landing />;
}
