'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const VendorOnboarding = dynamic(() => import('@/containers/vendor-onboading'));

const VendorOnboardingQuotesPage = () => {
  return <VendorOnboarding paymentSuccess />;
};

export default withAuth(VendorOnboardingQuotesPage)([USER_TYPE.PROVIDER_ONBOARDING]);
