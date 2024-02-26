'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const ProviderSettings = dynamic(() => import('@/containers/provider-settings'));

const ProviderSettingsPage = () => {
  return <ProviderSettings />;
};

export default withAuth(ProviderSettingsPage)([USER_TYPE.PROVIDER]);
