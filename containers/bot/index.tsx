import { FC, useEffect, useState } from 'react';
import NewBot from './components/NewBot';
import CustomLivePage from '@/containers/bot-live';
import { checkBotStatus } from '@/modules/bots/services';
import LoadingIndicator from '@/components/LoadingIndicator';

interface IBotProps { }

const Bot: FC<IBotProps> = (props) => {
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialize = async () => {
    setIsLoading(true);

    const res = await checkBotStatus();
    
    if(res.data !== true && res.data !== null) {
      setIsCreated(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    initialize();
  }, [])

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {isCreated === false && <NewBot />}
      {isCreated === true && <CustomLivePage />}
    </>
  );
};

export default Bot;
