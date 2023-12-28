'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/helpers/withAuth';
import dynamic from 'next/dynamic';

const IoTGPT = dynamic(() => import('@/containers/iotgpt'), { ssr: false });

const IoTGPTPage = () => {
  return <IoTGPT />;
};

export default withAuth(IoTGPTPage)([USER_TYPE.USER]);
