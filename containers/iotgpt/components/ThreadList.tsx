import Button from '@/components/Button';
import { ChangeEvent, FC, useContext, useState } from 'react';
import Image from 'next/image';
import { ProductsContext } from '../context';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ThreadItem from './ThreadItem';
import Input from '@/components/Input';
import { ENTER_KEY } from '@/constants/common';
import { IThreadInteraction } from '@/modules/iot-gpt/type';

interface IThreadListProps {
  onCloseSearchList: () => void;
}
export const DEFAULT_SEARCH = 'Search anything';
const ThreadList: FC<IThreadListProps> = ({ onCloseSearchList }) => {
  const { threads, setThreads, setActiveThread, setThreadInteractions } =
    useContext(ProductsContext);
  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  const handleAddNewSearch = async () => {
    if (threads.length && threads[0].title === DEFAULT_SEARCH) {
      return;
    }
    const newThreads = cloneDeep(threads);
    const addedThread = {
      thread_id: uuidv4(),
      title: DEFAULT_SEARCH,
      status: '',
      created_date: dayjs().toString(),
      isInitialThread: true,
    };
    newThreads.unshift(addedThread);

    setThreadInteractions([]);
    setActiveThread(newThreads[0]);
    setThreads(newThreads);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 md:px-8 relative">
        <Button variant="secondary" fullWidth onClick={handleAddNewSearch}>
          New Chat
        </Button>
        {isMobileMatches ? (
          <Button
            className="!p-0 absolute top-1/2 -translate-y-1/2 right-6"
            variant="inline"
            onClick={onCloseSearchList}
          >
            <img className="-rotate-90" src="/assets/icons/chevron-right-icon.svg" alt="" />
          </Button>
        ) : null}
        {/* <Input
          placeholder="Search anything..."
          value={searchKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === ENTER_KEY) {
              handleAddNewSearch();
            }
          }}
          endAdornment={
            isMobileMatches ? (
              <Button className="!p-0" variant="inline" onClick={onCloseSearchList}>
                <img className="-rotate-90" src="/assets/icons/chevron-right-icon.svg" alt="" />
              </Button>
            ) : null
          }
        /> */}
      </div>
      <ul className="search-list flex-1 overflow-auto my-4 px-4 md:px-8">
        {threads?.map((item, index) => (
          <li key={index}>
            <ThreadItem
              thread={item}
              onCloseThreadList={isMobileMatches ? onCloseSearchList : undefined}
            />
          </li>
        ))}
      </ul>
      <div className="justify-end self-end px-8 hidden md:flex">
        <Button
          className="md:!px-2.5 md:!py-2.5 !p-1.5"
          variant="secondary"
          onClick={onCloseSearchList}
        >
          <Image
            className="w-5 h-5"
            src="/assets/icons/chevron-left-icon.svg"
            width={20}
            height={20}
            alt="Icon"
          />
        </Button>
      </div>
    </div>
  );
};

export default ThreadList;
