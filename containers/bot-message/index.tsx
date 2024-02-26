import QuoteSnippetProvider from '@/providers/QuotesSnippetsProvider';
import clsx from 'clsx';
import { FC, useState } from 'react';
import SearchDetails from './components/ThreadDetails';
import ThreadList from './components/ThreadList';
import ProductsContextProvider from './context';

interface IChatMessagesProps { }

const ChatMessages: FC<IChatMessagesProps> = (props) => {
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);

  return (
    <ProductsContextProvider>
      <section className="products-section">
        <div className="flex relative">
          <div
            className={clsx(
              'md:w-[295px] h-[476px] md:h-screen md:border-r md:border-gray-200 bg-white z-10 rounded-lg md:rounded-none block absolute top-4 left-4 right-4 bottom-0 md:static'
            )}
          >
            <ThreadList onCloseSearchList={() => setIsOpenSearchList(false)} />
          </div>
          <div className="flex-1 h-[calc(100vh-79px)] md:h-screen bg-gray">
            <SearchDetails />
          </div>
        </div>
      </section>
    </ProductsContextProvider>
  );
};

export default ChatMessages;
