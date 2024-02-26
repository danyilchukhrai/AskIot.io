import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import { DATE_FORMAT } from '@/constants/date';
import { handleShowError } from '@/helpers/common';
import { useDeleteThread } from '@/modules/iot-gpt/hooks';
import { IThread } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import Image from 'next/image';
import { FC, useContext, useRef } from 'react';
import { ProductsContext } from '../context';

interface IThreadItemProps {
  thread: IThread;
  onCloseThreadList?: () => void;
}

const ThreadItem: FC<IThreadItemProps> = ({ thread, onCloseThreadList }) => {
  const confirmModalRef = useRef<IModalElement>(null);
  const {
    activeThread,
    threads,
    setThreads,
    setActiveThread,
    setThreadInteractions,
    handleSetDefaultThread,
    isLoading,
  } = useContext(ProductsContext);
  const isActive = activeThread?.thread_id === thread?.thread_id;
  const { mutate: deleteThread, isPending: deletingThread } = useDeleteThread();

  const handleSelectThread = () => {
    setActiveThread(thread);
    onCloseThreadList && onCloseThreadList();
  };

  const handleDeleteLocalThread = (id: string) => {
    const newThreads = cloneDeep(threads).filter((it) => it.thread_id !== id);
    setThreads(newThreads);
    setActiveThread(newThreads?.[0]);
    if (newThreads.length === 0) {
      setThreadInteractions([]);
      handleSetDefaultThread();
    }
    confirmModalRef.current?.close();
  };

  const handleDeleteChannel = () => {
    if (thread.isInitialThread) {
      handleDeleteLocalThread(thread.thread_id);
    } else {
      deleteThread(thread.thread_id, {
        onError: handleShowError,
        onSuccess: () => handleDeleteLocalThread(thread.thread_id),
      });
    }
  };

  return (
    <>
      <div className="flex py-2 cursor-pointer items-center" onClick={handleSelectThread}>
        <Image
          className="h-5 w-5"
          src={isActive ? '/assets/logo/logo.svg' : '/assets/logo/logo-gray.svg'}
          width={20}
          height={20}
          alt="AskIoT"
        />
        <div className="pl-3 flex-1 pr-2">
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
        {!(thread?.isInitialThread && threads?.length === 1) && (
          <Button
            variant="inline"
            onClick={(e) => {
              e.stopPropagation();
              confirmModalRef.current?.open();
            }}
            disabledPadding
            disabled={isLoading}
          >
            <img src="/assets/icons/danger-trash-icon.svg" alt="" width={15} height={15} />
          </Button>
        )}
      </div>
      <Modal
        ref={confirmModalRef}
        title="Delete Chat"
        primaryButtonLabel="Delete"
        onSubmit={handleDeleteChannel}
      >
        <div className="text-base">
          <p>Are you sure you want to delete this chat?</p>
          <p>This action cannot be undone.</p>
        </div>
      </Modal>
      <LoadingIndicator isLoading={deletingThread} />
    </>
  );
};

export default ThreadItem;
