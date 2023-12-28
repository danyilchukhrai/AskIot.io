import LoadingIndicator from '@/components/LoadingIndicator';
import { USER_TYPE } from '@/configs/routeConfig';
import { sortArray } from '@/helpers/common';
import { useGetAllMessages, useGetChannelDetailByQuoteId } from '@/modules/message/hooks';
import {
  IFirstPanelMessage,
  ISecondPanelMessage,
  IThirdPanelMessage,
} from '@/modules/message/types';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface IMessageContext {
  channels: IFirstPanelMessage[];
  secondPanel: ISecondPanelMessage[];
  productData?: IThirdPanelMessage;
  setSelectedChannel: Dispatch<SetStateAction<IFirstPanelMessage | undefined>>;
  selectedChannel?: IFirstPanelMessage;
  messageData: ISecondPanelMessage[];
  setChannels: Dispatch<SetStateAction<IFirstPanelMessage[]>>;
}

interface IMessageContextProviderProps {
  children: ReactNode;
}

export const MessageContext = createContext<IMessageContext>({} as IMessageContext);

const MessageContextProvider: FC<IMessageContextProviderProps> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<IFirstPanelMessage>();
  const [channels, setChannels] = useState<IFirstPanelMessage[]>([]);
  const { data: allMessages, isLoading: isLoadingGetAllMessages } = useGetAllMessages();
  const { firstPanel = [], secondPanel = [], thirdPanel } = allMessages || {};
  const messageDataInSecondPanel = secondPanel?.filter(
    (it) => it.quote_id === selectedChannel?.quote_id,
  );
  const { data: channelDetails } = useGetChannelDetailByQuoteId(
    selectedChannel?.quote_id as number,
    !messageDataInSecondPanel.length,
  );
  const productData =
    selectedChannel?.quote_id === thirdPanel?.quote_id ? thirdPanel : channelDetails?.thirdPanel;
  const { user } = useAuthContext();
  const { currentUserType } = useUserTypeContext();

  useEffect(() => {
    if (firstPanel.length) {
      handleSetChannels();
    }
  }, [firstPanel.length]);

  // useEffect(() => {
  //   setMessageData(initMessageData);
  // }, [initMessageData]);

  const getChannelsByUserType = (sortedChannels: IFirstPanelMessage[]) => {
    if (currentUserType === USER_TYPE.USER) {
      // Only get channels which have the senderId is the current user
      return sortedChannels?.filter((it) => it.senderid === user?.id);
    } else {
      // Only get channels which have the receiverId is the current user
      return sortedChannels?.filter((it) => it.receiverid === user?.id);
    }
  };

  const handleSetChannels = () => {
    const sortedChannels: IFirstPanelMessage[] = sortArray(firstPanel, {
      isSortByDate: true,
      isAscending: false,
      sortBy: 'timestamp',
    });
    const newChannels = getChannelsByUserType(sortedChannels);

    setChannels(newChannels);
    setSelectedChannel(newChannels[0]);
  };

  return (
    <>
      <MessageContext.Provider
        value={{
          setSelectedChannel,
          selectedChannel,
          channels,
          setChannels,
          secondPanel,
          productData,
          messageData: channelDetails?.secondPanel || messageDataInSecondPanel,
        }}
      >
        {children}
      </MessageContext.Provider>
      {isLoadingGetAllMessages && <LoadingIndicator />}
    </>
  );
};

export default MessageContextProvider;
