'use client';

import { withAuth } from '@/HOC/withAuth';
import { USER_TYPE } from '@/configs/routeConfig';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Bot = dynamic(() => import('@/containers/bot'));

const BotPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setIsSuccess(true);
    }
  }, [sessionId]);

  if (!isSuccess) return null;

  return <Bot paymentSuccess />;
};

export default withAuth(BotPage)([USER_TYPE.PROVIDER]);
