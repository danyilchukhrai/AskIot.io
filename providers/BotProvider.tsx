'use client';

import { createAskIotUser, getAskIotUserDetails } from '@/services/user';
import * as React from 'react';

interface IBotProviderProps {
  children: React.ReactNode;
}

interface IBotContext {
  goLive: boolean;
  setGoLive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BotContext = React.createContext<IBotContext>({} as IBotContext);

export const useBotContext = () => {
  const context = React.useContext(BotContext);
  if (!context) {
    throw new Error('BotContext must be used within provider!');
  }
  return context;
};

const BotProvider: React.FunctionComponent<IBotProviderProps> = (props) => {
  const [goLive, setGoLive] = React.useState<boolean>(false);

  return (
    <BotContext.Provider
      value={{
        goLive,
        setGoLive,
      }}
    >
      {props.children}
    </BotContext.Provider>
  );
};

export default BotProvider;
