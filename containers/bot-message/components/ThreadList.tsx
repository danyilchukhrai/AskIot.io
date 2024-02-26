import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { FC, useContext } from 'react';
import DropdownButton, { IDropdownMenuItem } from '@/components/DropdownButton';
import { ProductsContext } from '../context';
import ThreadItem from './ThreadItem';
import { IThread } from '@/modules/bots/types';

interface IThreadListProps {
  onCloseSearchList: () => void;
}
export const DEFAULT_SEARCH = 'Search anything';
const ThreadList: FC<IThreadListProps> = ({ onCloseSearchList }) => {

  const { threads } =
    useContext(ProductsContext);

  const [filteredthreads, setFilteredThreads] = useState<IThread[]>(threads);

  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  // Define the dropdown menu items
  const dropdownMenu: IDropdownMenuItem[] = [
    {
      label: 'Last 24 hours',
      onAction: () => filterThreadsByTimeRange(24 * 60 * 60 * 1000) // 24 hours in milliseconds
    },
    {
      label: 'Last 7 days',
      onAction: () => filterThreadsByTimeRange(7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds
    },
    {
      label: 'Last 30 days',
      onAction: () => filterThreadsByTimeRange(30 * 24 * 60 * 60 * 1000) // 30 days in milliseconds
    }
  ];

  const filterThreadsByTimeRange = (timeRange: number) => {
    // Calculate the date threshold based on the time range
    const currentDate = new Date();
    const thresholdDate = new Date(currentDate.getTime() - timeRange);

    // Filter threads based on the date threshold
    const filteredThreads = threads.filter(thread => new Date(thread.date) >= thresholdDate);

    setFilteredThreads(filteredThreads);
  };

  useEffect(() => {
    setFilteredThreads(threads);
  }, [threads]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center pb-0 md:p-6 md:pb-6 justify-end">
        <div className='flex gap-[5px] align-center'>
          <DropdownButton
            icon="/assets/icons/filter.png"
            className=''
            dropdownMenu={dropdownMenu}
          />
          <p>Filter</p>
        </div>
      </div>
      {/* <div className='h-[1px] bg-gray-200 hidden md:block'></div> */}
      <div className="px-4 md:px-8 relative">
        {isMobileMatches ? (
          <Button
            className="!p-0 absolute top-1/2 -translate-y-1/2 right-6"
            variant="inline"
            onClick={onCloseSearchList}
          >
            <img className="-rotate-90" src="/assets/icons/chevron-right-icon.svg" alt="" />
          </Button>
        ) : null}
      </div>
      <ul className="search-list flex-1 overflow-auto my-4 px-4 md:px-8">
        {filteredthreads?.map((item, index) => (
          <li key={index}>
            <ThreadItem
              thread={item}
              onCloseThreadList={isMobileMatches ? onCloseSearchList : undefined}
            />
          </li>
        ))}
        {
          filteredthreads.length === 0 && <li>
            <div className="flex py-2 cursor-pointer">
              <div className="pl-3 flex-1 pr-2">
                <p
                  className=
                  'text-base line-clamp-1 break-all text-gray-1000 font-medium'
                >
                  Hello &#128075;
                </p>
                <p className='text-s  mt-1 text-gray-1000'>
                  There are no messages yet.
                </p>
              </div>
              <p
                className=
                'text-base line-clamp-1 break-all text-gray-1000 font-medium'
              >

              </p>
            </div>
          </li>
        }
      </ul>
    </div>
  );
};

export default ThreadList;
