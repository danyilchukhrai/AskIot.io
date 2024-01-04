'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/helpers/withAuth';
import dynamic from 'next/dynamic';

const VendorDetail = dynamic(() => import('@/containers/vendor-detail'));

const VendorsPage = () => {
  return <VendorDetail isVendor />;
};

export default withAuth(VendorsPage)([USER_TYPE.PROVIDER]);
