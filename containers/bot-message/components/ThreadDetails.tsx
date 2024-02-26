import MessagesContainer from './MessagesContainer';
import { FC, useContext } from 'react';
import { ProductsContext } from '../context';
import ThreadDetailsHeader from './ThreadDetailsHeader';

interface IThreadDetailsProps {}

const ThreadDetails: FC<IThreadDetailsProps> = () => {
  const { activeThread, threadInteractions } = useContext(ProductsContext);

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
      <ThreadDetailsHeader activeThread={activeThread} />
      {threadInteractions.length > 0 ? (
        <div className="flex-1 overflow-auto p-4 md:p-8 space-y-4">
          {/* MessagesContainer will also need Tailwind CSS adjustments */}
          <MessagesContainer data={threadInteractions} isLoading={false} />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center absolute inset-0'>
          <img src="/assets/icons/no-messages-icon.png" alt="No messages" className="w-24 h-24 mb-4" />
          <p className='text-base text-gray-700 font-medium text-center'>No chats yet</p>
        </div>
      )}
    </div>
  );
};

export default ThreadDetails;