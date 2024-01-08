import LoadingIndicator from '@/components/LoadingIndicator';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import CustomLivePage from '@/containers/bot-live';
import { checkBotStatus } from '@/modules/bots/services';
import { useUserContext } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import NewBot from './components/NewBot';

interface IBotProps {}

const Bot: FC<IBotProps> = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isNoPaymentStatus } = useUserContext();
  const router = useRouter();

  const initialize = async () => {
    setIsLoading(true);

    const res = await checkBotStatus();

    if(res.data !== true && res.data !== null) {
      setIsCreated(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (isNoPaymentStatus) {
      router.push(RESTRICTED_APP_ROUTES.BOT_SUBSCRIPTION);
    }
  }, [isNoPaymentStatus]);

  if (isLoading) return <LoadingIndicator />;
  if (typeof isNoPaymentStatus !== 'boolean' || isNoPaymentStatus) return null;

  return (
    <>
      {isCreated === false && <NewBot />}
      {isCreated === true && <CustomLivePage />}
    </>
  );
};

export default Bot;
