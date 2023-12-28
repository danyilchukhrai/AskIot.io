import MessageItem from '@/components/Molecules/Chat/MessageItem';
import SearchBox from '@/components/SearchBox';
import { ISecondPanelMessage } from '@/modules/message/types';
import { useAuthContext } from '@/providers/AuthProvider';
import * as React from 'react';

interface IMessageContainerProps {
  messageData: ISecondPanelMessage[];
  onSend: (value: string) => void;
}

const MessageContainer: React.FunctionComponent<IMessageContainerProps> = ({
  messageData,
  onSend,
}) => {
  const messageContainerRef = React.useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (messageContainerRef?.current) {
      messageContainerRef.current.scrollTop = messageContainerRef?.current?.scrollHeight;
    }
  }, [messageContainerRef, messageData]);

  return (
    <>
      <div ref={messageContainerRef} className="flex-1 overflow-auto md:px-8 md:pt-8 px-4 pt-4">
        <div className="h-full">
          {messageData?.map((item, index) => {
            const isCurrentUser = item.sender_id === user?.id;
            return (
              <div className="mb-5 last:mb-0" key={index}>
                <MessageItem
                  content={item.messagecontent}
                  isCurrentUser={isCurrentUser}
                  aiLogo={item?.logo || item?.vendorlogo}
                  senderFirstName={isCurrentUser ? item.sender_first_name : ''}
                  senderLastName={isCurrentUser ? item.sender_last_name : ''}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-4 md:px-8 md:pb-8 px-4 pb-4">
        <SearchBox
          onSearch={(value) => onSend(value)}
          placeholder="Write your message here..."
          hideInputIcon
          attachFile
        />
      </div>
    </>
  );
};

export default MessageContainer;
