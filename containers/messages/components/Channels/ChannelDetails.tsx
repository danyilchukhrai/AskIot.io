import Button from '@/components/Button';
import { CustomImg } from '@/components/CustomImage';
import { USER_TYPE } from '@/configs/routeConfig';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { handleShowError, sortArray } from '@/helpers/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNewMessage } from '@/modules/message/hooks';
import { ISecondPanelMessage } from '@/modules/message/types';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { cloneDeep } from 'lodash';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { MessageContext } from '../../context';
import MessageContainer from './MessageContainer';

interface IChannelDetailsProps {
  isShowProductInfo: boolean;
  handleOpenProductInfo: () => void;
  onOpenProductDrawer?: () => void;
  onCloseProductDrawer?: () => void;
}

const ChannelDetails: FC<IChannelDetailsProps> = ({
  isShowProductInfo,
  handleOpenProductInfo,
  onOpenProductDrawer,
}) => {
  const isBelowXlScreen = useMediaQuery('(max-width: 1279px)');
  const { selectedChannel, messageData, channels, setChannels, productData } =
    useContext(MessageContext);
  const { mutate: newMessage } = useNewMessage();
  const { user } = useAuthContext();
  const { currentUserType } = useUserTypeContext();
  const isUser = currentUserType === USER_TYPE.USER;
  const [localMessage, setLocalMessage] = useState<ISecondPanelMessage[]>([]);

  const messageIdRef = useRef<number>();

  useEffect(() => {
    if (productData) {
      handleOpenProductInfo();
    }
  }, [productData]);

  const handleSendMessage = (value: string) => {
    const notCurrentUserMessage = messageData.filter((item) => item.sender_id !== user?.id);
    let lastMessage = messageData[messageData?.length - 1];
    if (localMessage.length) {
      lastMessage = localMessage[localMessage.length - 1];
    }
    messageIdRef.current = lastMessage.message_id + 1;

    const newMessageItem: ISecondPanelMessage = {
      ...(lastMessage || {}),
      message_id: messageIdRef.current,
      messagecontent: value,
      timestamp: new Date().toUTCString(),
      isread: false,
      quote_id: 34,
      sender_first_name: lastMessage?.sender_first_name,
      sender_last_name: lastMessage?.sender_last_name,
      receiver_first_name: lastMessage?.receiver_first_name,
      receiver_last_name: lastMessage?.receiver_last_name,
      sender_id: user?.id || '',
      receiver_id: lastMessage.receiver_id,
    };
    const newChannels = cloneDeep(channels);

    setLocalMessage((prev) =>
      sortArray([...prev, newMessageItem], {
        isSortByDate: true,
        isAscending: true,
        sortBy: 'timestamp',
      }),
    );
    setChannels(
      newChannels.map((it) => ({
        ...it,
        messagecontent: it.quote_id === selectedChannel?.quote_id ? value : it.messagecontent,
      })),
    );

    newMessage(
      {
        senderId: user?.id || '',
        receiverId: notCurrentUserMessage[0]?.sender_id || '',
        messageContent: value,
        quoteId: selectedChannel?.quote_id as number,
      },
      {
        onError: handleShowError,
      },
    );
  };

  const getUnitMessageArray = () => {
    const messages = [...messageData, ...localMessage];
    const uniqIds = [...new Set(messages.map((it) => it.message_id))];

    return uniqIds.map((id) =>
      messages.find((it) => it.message_id === id),
    ) as ISecondPanelMessage[];
  };

  if (!channels.length)
    return (
      <p className="text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        No message
      </p>
    );
  if (!selectedChannel) return null;

  console.log(getUnitMessageArray());

  return (
    <div className="h-full flex flex-col">
      {selectedChannel && (
        <div className="chat-header p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            {isUser && (
              <CustomImg
                className="w-auto h-10 object-cover"
                src={selectedChannel?.vendorlogo || DEFAULT_VENDOR_LOGO}
                alt="icon"
              />
            )}
            <div className="md:pl-4 pl-2">
              <p className="text-gray-1000 line-clamp-1 text-s md:text-base font-medium">
                {isUser ? messageData[0]?.vendorname : selectedChannel?.sendername}
              </p>
              <p className="text-gray-600 text-xs md:text-s line-clamp-1 pt-0.5">
                {messageData[0]?.vendorname}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:flex-wrap">
            {(!isShowProductInfo || isBelowXlScreen) && (
              <Button
                className="text-s md:text-base !px-2"
                variant="info"
                onClick={isBelowXlScreen ? onOpenProductDrawer : handleOpenProductInfo}
              >
                Get details
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="chat-body flex-1 flex flex-col overflow-auto">
        <MessageContainer messageData={getUnitMessageArray()} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChannelDetails;
