import dynamic from 'next/dynamic';

const Terms = dynamic(() => import('@/containers/terms'));

export default function TermsPage() {
  return <Terms />;
}
