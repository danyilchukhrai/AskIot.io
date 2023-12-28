import { sortArray } from '@/helpers/common';
import { useGetUserThreads } from '@/modules/iot-gpt/hooks';
import { IThread, IThreadInteraction } from '@/modules/iot-gpt/type';
import dayjs from 'dayjs';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_SEARCH } from '../components/ThreadList';

interface IProductsContext {
  threads: IThread[];
  setThreads: Dispatch<SetStateAction<IThread[]>>;
  activeThread: IThread | undefined;
  setActiveThread: Dispatch<SetStateAction<IThread | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  threadInteractions: IThreadInteraction[];
  setThreadInteractions: Dispatch<SetStateAction<IThreadInteraction[]>>;
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
  const { data: threadsData } = useGetUserThreads();

  useEffect(() => {
    handleInitThreads();
  }, [threadsData?.threads]);

  const handleInitThreads = () => {
    if (!threadsData?.threads) return;

    if (threadsData.threads.length) {
      const sortedThreads = sortArray(threadsData.threads, {
        isSortByDate: true,
        isAscending: false,
        sortBy: 'created_date',
      });

      setThreads(sortedThreads);
      setActiveThread(sortedThreads[0]);
    } else {
      const defaultThread = {
        thread_id: uuidv4(),
        title: DEFAULT_SEARCH,
        status: '',
        created_date: dayjs().toString(),
        isInitialThread: true,
      };
      setThreads([defaultThread]);
      setActiveThread(defaultThread);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
