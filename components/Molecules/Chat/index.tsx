import SearchBox from '@/components/SearchBox';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { FC, useEffect, useRef, useState } from 'react';
import MessagesContainer from './MessagesContainer';
import Suggestions from './Suggestions';
import UserProvider from '@/providers/UserProvider';

interface IChatProps {
  messageData?: IThreadInteraction[];
  onSend: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestionList?: string[];
  hideInputIcon?: boolean;
  attachFile?: boolean;
}

const Chat: FC<IChatProps> = ({
  messageData,
  onSend,
  isLoading,
  placeholder,
  suggestionList,
  hideInputIcon = false,
  attachFile = false,
}) => {
  const [suggestion, setSuggestion] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef?.current) {
      messageContainerRef.current.scrollTop = messageContainerRef?.current?.scrollHeight;
    }
  }, [messageData, messageContainerRef, isLoading]);

  const handleSelectSuggestion = (value: string) => {
    setSuggestion(value);
  };

  const handleSend = (value: string) => {
    onSend(value);
  };

  return (
    <>
      <div ref={messageContainerRef} className="flex-1 overflow-auto md:px-8 md:pt-8 px-4 pt-4">
        <UserProvider>
          <MessagesContainer data={messageData} isLoading={isLoading} />
        </UserProvider>
      </div>
      {!messageData?.length && !!suggestionList?.length && (
        <div className="md:px-8 px-4">
          <Suggestions
            onSelectSuggestion={handleSelectSuggestion}
            suggestionList={suggestionList}
          />
        </div>
      )}
      <div className="pt-4 md:px-8 md:pb-8 px-4 pb-4">
        <SearchBox
          onSearch={(value) => handleSend(value)}
          suggestion={suggestion}
          placeholder={placeholder}
          hideInputIcon={hideInputIcon}
          attachFile={attachFile}
        />
      </div>
    </>
  );
};

export default Chat;
