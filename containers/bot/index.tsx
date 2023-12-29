import { FC, useEffect, useState } from 'react';
import NewBot from './components/NewBot';
import CustomLivePage from '@/containers/bot-live';

interface IBotProps { }

const Bot: FC<IBotProps> = (props) => {
  const [liveUri, setLiveUri] = useState('');

  useEffect(() => {
    const uri = localStorage.getItem('uri');
    if(uri !== null && uri !== '' && uri !== undefined) {
      setLiveUri(uri);
    }
  }, [])

  return (
    <>
      {liveUri === '' && <NewBot />}
      {liveUri !== '' && <CustomLivePage />}
    </>
  );
};

export default Bot;
