'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const VendorProductForm = dynamic(() => import('@/containers/vendor-product-form'));

const VendorProductFormPage = () => {
  return <VendorProductForm />;
};

export default withAuth(VendorProductFormPage)([USER_TYPE.PROVIDER]);
