'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const Settings = dynamic(() => import('@/containers/settings'));

const SettingsPage = () => {
  return <Settings />;
};

export default withAuth(SettingsPage)([USER_TYPE.PROVIDER, USER_TYPE.USER]);
