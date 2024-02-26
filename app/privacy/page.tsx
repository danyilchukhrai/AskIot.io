import dynamic from 'next/dynamic';

const Privacy = dynamic(() => import('@/containers/privacy'));

export default function PrivacyPage() {
  return <Privacy />;
}
