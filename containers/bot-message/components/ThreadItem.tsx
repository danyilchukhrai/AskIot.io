// ThreadItem.tsx
import { DATE_FORMAT, TIME_FORMAT } from '@/constants/date';
import { IThread } from '@/modules/bots/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, useContext } from 'react';
import { ProductsContext } from '../context';

interface IThreadItemProps {
  thread: IThread;
  onCloseThreadList?: () => void;
}

const ThreadItem: FC<IThreadItemProps> = ({ thread, onCloseThreadList }) => {
  const { activeThread, setActiveThread } = useContext(ProductsContext);
  const isActive = activeThread?.threadId === thread?.threadId;

  const handleSelectThread = () => {
    setActiveThread(thread);
    if (onCloseThreadList) {
      onCloseThreadList();
    }
  };

  return (
    <div
      className={clsx(
        'flex py-4 px-3 my-2 bg-white shadow rounded-lg cursor-pointer transition duration-300 ease-in-out w-full', // w-full for full width
        'hover:bg-gray-100',
        isActive ? 'border-l-4 border-blue-500 bg-blue-50' : 'border',
      )}
      onClick={handleSelectThread}
    >
      <div className="flex-1">
        <div className='flex justify-between items-center'>
          <p
            className={clsx(
              'text-base font-medium truncate', // Truncate long text
              isActive ? 'text-blue-500' : 'text-gray-700',
            )}
          >
            {thread?.date ? dayjs(thread.date).format(DATE_FORMAT) : "Unknown Date"}
          </p>
          <p
            className={clsx(
              'text-base font-medium truncate', // Truncate long text
              isActive ? 'text-blue-500' : 'text-gray-700',
            )}
          >
            {thread?.date ? dayjs(thread.date).format(TIME_FORMAT) : "Unknown Time"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;

