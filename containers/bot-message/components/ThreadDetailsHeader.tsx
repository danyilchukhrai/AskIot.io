import Button from '@/components/Button';
import { FC } from 'react';
import Image from 'next/image';
import { IThread } from '@/modules/bots/types';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants/date';

interface IThreadDetailsHeaderProps {
  activeThread?: IThread;
}

const ThreadDetailsHeader: FC<IThreadDetailsHeaderProps> = ({ activeThread }) => {
  return (
    <>
      <div className="flex items-center p-4 pb-0 md:p-8 md:pb-8">
        <div className="ml-5 flex items-center">
          <Image src="/assets/logo/logo.svg" alt="AskIoT" width={20} height={20} />
          <p className="text-gray-1000 text-base font-medium mx-3 line-clamp-1 break-all">
            {dayjs(activeThread?.date).format(DATE_FORMAT)}
          </p>
        </div>
        <div />
      </div>
      <div className="h-[1px] bg-gray-200 mx-5 hidden md:block" />
    </>
  );
};

export default ThreadDetailsHeader;
