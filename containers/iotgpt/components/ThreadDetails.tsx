import Chat from '@/components/Molecules/Chat';
import Spinner from '@/components/Spinner';
import { handleShowError } from '@/helpers/common';
import { useChatQueryDev, useGetThreadDetails } from '@/modules/iot-gpt/hooks';
import { IChatQueryResponse, IThreadInteraction } from '@/modules/iot-gpt/type';
import { cloneDeep, get } from 'lodash';
import { FC, useContext, useEffect } from 'react';
import { ProductsContext } from '../context';
import ThreadDetailsHeader from './ThreadDetailsHeader';
import { DEFAULT_SEARCH } from './ThreadList';

interface IThreadDetailsProps {
  isOpenSearchList: boolean;
  onOpenSearchList: () => void;
}

const SUGGESTIONS = [
  'What devices support tank monitoring?',
  'whats the command to check battery level on queclink GL550',
  'Help me design a factory floor solution',
  'Who can help me install my retail wireless gateways?',
];

const ThreadDetails: FC<IThreadDetailsProps> = ({ isOpenSearchList, onOpenSearchList }) => {
  const {
    activeThread,
    threadInteractions,
    setThreadInteractions,
    threads,
    setThreads,
    setIsLoading,
  } = useContext(ProductsContext);
  // const { mutate: chatQuery, isPending: querying } = useChatQuery();
  const { mutate: chatQueryDev, isPending: querying } = useChatQueryDev();

  const { data: threadDetails, isLoading: gettingThreadDetails } = useGetThreadDetails(
    activeThread?.thread_id || '',
  );
  const { results: recommendationProductsResult } = threadDetails?.details || {};

  useEffect(() => {
    if (threadDetails?.details) {
      handleSetThreadInteractions(threadDetails.details?.interactions);
    }
  }, [threadDetails?.details, recommendationProductsResult]);

  useEffect(() => {
    handleChatQuery();
  }, [threadInteractions]);

  useEffect(() => {
    setIsLoading(querying);
  }, [querying]);

  const handleSetThreadInteractions = (interactions: IThreadInteraction[]) => {
    const newThreadInteractions = (interactions || []).map((it) => ({
      ...it,
      recommendations: get(recommendationProductsResult, `${it.id}`),
    }));

    setThreadInteractions(newThreadInteractions);
  };

  const handleSearch = async (value: string) => {
    const newThreads = cloneDeep(threads);
    const interactionLength = threadInteractions.length;
    const newId = interactionLength + 1;

    const interactionItem: IThreadInteraction = {
      id: newId,
      user: value,
      keywords: value,
      ai: '',
    };

    setThreadInteractions((prev) => [...prev, interactionItem]);

    // Update title of new thread on FE
    if (activeThread?.isInitialThread && newThreads[0].title === DEFAULT_SEARCH) {
      newThreads[0].title = value;
      newThreads[0].isInitialThread = false;
      setThreads(newThreads);
    }
  };

  const handleChatQuery = () => {
    if (!threadInteractions.length) return;
    const lastInteraction = threadInteractions[threadInteractions.length - 1];
    if (lastInteraction.ai) return;

    chatQueryDev(
      {
        threadId: activeThread?.thread_id || '',
        query: lastInteraction.user,
      },
      {
        onSuccess: handleChatQuerySuccess,
        onError: handleShowError,
      },
    );
  };

  const handleChatQuerySuccess = (data: IChatQueryResponse) => {
    const { greeting, recommendations } = data || {};
    const newThreadInteractions = cloneDeep(threadInteractions);
    const lastInteraction = newThreadInteractions[newThreadInteractions.length - 1];

    lastInteraction.ai = greeting;
    lastInteraction.recommendations = recommendations;

    setThreadInteractions(newThreadInteractions);
  };

  if (gettingThreadDetails)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full w-full bg-gray flex flex-col">
      {!isOpenSearchList && (
        <ThreadDetailsHeader activeThread={activeThread} onOpenSearchList={onOpenSearchList} />
      )}
      <>
        <Chat
          messageData={threadInteractions}
          onSend={handleSearch}
          isLoading={querying}
          suggestionList={SUGGESTIONS}
        />
      </>
    </div>
  );
};

export default ThreadDetails;
