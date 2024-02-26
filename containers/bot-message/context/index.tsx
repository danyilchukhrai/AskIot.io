import { sortArray } from '@/helpers/common';
import { getThreadDetails } from '@/modules/bots/services';
import { IThread, IThreadInteraction } from '@/modules/bots/types';
import dayjs from 'dayjs';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_SEARCH } from '../components/ThreadList';

interface IProductsContext {
  botIcon: string | null;
  userIcon: string | null;
  threads: IThread[];
  setThreads: Dispatch<SetStateAction<IThread[]>>;
  activeThread: IThread | undefined;
  setActiveThread: Dispatch<SetStateAction<IThread | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  threadInteractions: IThreadInteraction[];
  setThreadInteractions: Dispatch<SetStateAction<IThreadInteraction[]>>;
  handleSetDefaultThread: () => void;
}

interface IProductsContextProviderProps {
  children: ReactNode;
}

export const ProductsContext = createContext<IProductsContext>({} as IProductsContext);

const ProductsContextProvider: FC<IProductsContextProviderProps> = ({ children }) => {
  const [threads, setThreads] = useState<IThread[]>([]);
  const [activeThread, setActiveThread] = useState<IThread | undefined>();
  const [threadInteractions, setThreadInteractions] = useState<IThreadInteraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botIcon, setBotIcon] = useState(null);
  const [userIcon, setUserIcon] = useState(null);
  const [threadsData, setThreadsData] = useState<IThread[]>([]);

  const getThreadData = async () => {
    try {
      const data: any = await getThreadDetails();
      setThreadsData(data.threads);
      setBotIcon(data.botIcon);
      setUserIcon(data.userIcon);
    } catch(e) {
      console.log('e', e);
    }
  }

  useEffect(() => {
    getThreadData();
  }, [])

  useEffect(() => {
    if(activeThread?.interactions !== undefined)
      setThreadInteractions(activeThread?.interactions);
  }, [activeThread])

  useEffect(() => {
    handleInitThreads();
  }, [threadsData]);

  const handleInitThreads = () => {
    if (!threadsData) return;

    if (threadsData.length) {
      const sortedThreads = sortArray(threadsData, {
        isSortByDate: true,
        isAscending: false,
        sortBy: 'created_date',
      });

      setThreads(sortedThreads);
      setActiveThread(sortedThreads[0]);
    }
  };

  const handleSetDefaultThread = () => {
    const defaultThread = {
      threadId: uuidv4(),
      title: DEFAULT_SEARCH,
      status: '',
      date: dayjs().toString(),
      isInitialThread: true,
    };
    setThreads([defaultThread]);
    setActiveThread(defaultThread);
  };

  
  return (
    <ProductsContext.Provider
      value={{
        botIcon,
        userIcon,
        threads,
        setThreads,
        activeThread,
        setActiveThread,
        isLoading,
        setIsLoading,
        threadInteractions: sortArray(threadInteractions, {
          sortBy: 'id',
          isAscending: true,
        }),
        setThreadInteractions,
        handleSetDefaultThread,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
