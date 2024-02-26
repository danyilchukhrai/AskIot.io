'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const VendorLeads = dynamic(() => import('@/containers/vendor-leads'));

const VendorLeadsPage = () => {
  return <VendorLeads />;
};

export default withAuth(VendorLeadsPage)([USER_TYPE.PROVIDER]);



