import dynamic from 'next/dynamic';

const NewLanding = dynamic(() => import('@/containers/landing-provider'));

export default function NewLandingPage() {
  return <NewLanding />;
}
