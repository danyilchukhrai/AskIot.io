import { ISearchItem } from '@/interfaces/products';
import Image from 'next/image';
import { FC, useContext } from 'react';
import { ProductsContext } from '../context';
import clsx from 'clsx';
import { IThread } from '@/modules/iot-gpt/type';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants/date';

interface IThreadItemProps {
  thread: IThread;
  onCloseThreadList?: () => void;
}

const ThreadItem: FC<IThreadItemProps> = ({ thread, onCloseThreadList }) => {
  const { activeThread, setActiveThread } = useContext(ProductsContext);
  const isActive = activeThread?.thread_id === thread?.thread_id;

  const handleSelectThread = () => {
    setActiveThread(thread);
    onCloseThreadList && onCloseThreadList();
  };

  return (
    <div className="flex py-2 cursor-pointer" onClick={handleSelectThread}>
      <Image
        className="h-5 w-5"
        src={isActive ? '/assets/logo/logo.svg' : '/assets/logo/logo-gray.svg'}
        width={20}
        height={20}
        alt="AskIoT"
      />
      <div className="pl-3">
        <p
          className={clsx(
            'text-base line-clamp-1 break-all',
            isActive ? 'text-gray-1000 font-medium' : 'text-gray-600 font-normal',
          )}
        >
          {thread.title}
        </p>
        <p className={clsx('text-s  mt-1', isActive ? 'text-gray-500' : 'text-gray-400')}>
          {dayjs(thread?.created_date).format(DATE_FORMAT)}
        </p>
      </div>
    </div>
  );
};

export default ThreadItem;
