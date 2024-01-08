import Button from '@/components/Button';
import Chat from '@/components/Molecules/Chat';
import { handleShowError } from '@/helpers/common';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { useChatVendorQuery } from '@/modules/vendors/hooks';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IVendorChatProps {
  setIsOpenChat: Dispatch<SetStateAction<boolean>>;
  vendorId?: number;
  vendorLogo?: string;
}

const SUGGESTION = [
  'Other alternatives',
  'Something',
  'Recommended contact',
  'Recommended platform',
];

const threadId = uuidv4();

const VendorChat: FC<IVendorChatProps> = ({ setIsOpenChat, vendorId, vendorLogo }) => {
  const [messageData, setMessageData] = useState<IThreadInteraction[]>([]);
  const { mutate: chatVendorQuery, isPending: querying } = useChatVendorQuery();

  const handleSendMessage = (value: string) => {
    const interactionId = messageData.length + 1;
    const newInteractionItem = {
      id: interactionId,
      user: value,
      ai: '',
      keywords: value,
      aiLogo: vendorLogo,
    };
    let newMessageData = [...messageData, newInteractionItem];

    setMessageData(newMessageData);
    chatVendorQuery(
      {
        vendorId,
        query: value,
        threadId,
      },
      {
        onSuccess: (data) => {
          // Update message data with aiResponse after query successfully
          const latestMessage = newMessageData[newMessageData.length - 1];
          latestMessage.ai = data?.response || data?.greeting || '';
          setMessageData(newMessageData);
        },
        onError: handleShowError,
      },
    );
  };

  const getConversationHistory = (): string[] => {
    return messageData?.reduce((prev: string[], currentItem) => {
      const result = [...prev];
      currentItem.user && result.push(`User: ${currentItem.user}`);
      currentItem.ai && result.push(currentItem.ai);

      return result;
    }, []);
  };

  return (
    <div className="md:h-screen h-[calc(100vh-79px)] max-h-screen flex flex-col">
      <div className="flex items-center justify-between p-8 border-b border-gray-200">
        <p className="text-gray-1000 text-l font-medium">Ask anything about this vendor</p>
        <Button
          className="absolute top-8 right-8"
          variant="inline"
          disabledPadding
          onClick={() => setIsOpenChat(false)}
        >
          <Image src="/assets/icons/x-mark-icon.svg" alt="X mark icon" width={24} height={24} />
        </Button>
      </div>
      <div className="flex-1 flex flex-col overflow-auto [&_.avatar]:object-contain">
        <Chat
          messageData={messageData}
          onSend={handleSendMessage}
          isLoading={querying}
          placeholder="Ask anything about this product..."
          suggestionList={SUGGESTION}
        />
      </div>
    </div>
  );
};

export default VendorChat;
