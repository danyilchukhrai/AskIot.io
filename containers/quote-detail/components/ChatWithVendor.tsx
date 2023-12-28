import Chat from '@/components/Molecules/Chat';
import { IMessage } from '@/interfaces/products';
import { AIResponse } from '@/services/dummy';
import { FC, useEffect, useState } from 'react';

interface IChatWithVendorProps {}

const ChatWithVendor: FC<IChatWithVendorProps> = (props) => {
  const [messageData, setMessageData] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSetVendorMessage();
  }, []);

  const handleSetVendorMessage = () => {
    // const vendorMessage: IMessage = {
    //   isCurrentUser: false,
    //   createdAt: Date.now(),
    //   content:
    //     'Lorem ipsum dolor sit amet consectetur. Hac duis enim tempus feugiat risus dolor ut. Varius in habitasse pellentesque etiam lacus proin. Sociis diam consectetur volutpat habitant urna laoreet pulvinar libero integer.',
    //   type: 'text',
    //   senderImage: '/assets/images/dummy-vendor.png',
    // };
    // setMessageData((prev) => [...prev, vendorMessage]);
  };

  const handleSendMessage = (value: string) => {
    setMessageData((prev) => [
      ...prev,
      {
        content: value,
        type: 'text',
        createdAt: Date.now(),
        isCurrentUser: true,
      },
    ]);
    handleFakeAIResponse();
  };

  const handleFakeAIResponse = async () => {
    // setIsLoading(true);
    // const fakeContent =
    //   'Lorem ipsum dolor sit amet consectetur. Hac duis enim tempus feugiat risus dolor ut. Varius in habitasse pellentesque etiam lacus proin. Sociis diam consectetur volutpat habitant urna laoreet pulvinar libero integer.';
    // const AIMessage = await AIResponse('text', {
    //   content: fakeContent,
    //   senderImage: '/assets/images/dummy-vendor.png',
    // });
    // setMessageData((prev) => [...prev, AIMessage]);
    // setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-8 pl-8 border-b border-gray-200">
        <p className="text-gray-1000 text-l font-medium mb-1">Chat with Samsung</p>
        <p className="text-s text-gray-600">quoteID sd8lanr98s2bh4gv</p>
      </div>
      <div className="chat-container flex-1 flex flex-col overflow-auto">
        <Chat
          // messageData={messageData}
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder="Send a message to Samsung"
          hideInputIcon
        />
      </div>
    </div>
  );
};

export default ChatWithVendor;
