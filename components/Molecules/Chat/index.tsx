import SearchBox from '@/components/SearchBox';
import Turnstile from '@/components/Turnstile';
import { REQUIRED_MESSAGE } from '@/constants/validation';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { FC, useEffect, useRef, useState } from 'react';
import MessagesContainer from './MessagesContainer';
import Suggestions from './Suggestions';

interface IChatProps {
  messageData?: IThreadInteraction[];
  onSend: (value: string, captchaToken: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestionList?: string[];
  hideInputIcon?: boolean;
  attachFile?: boolean;
  onSubmitEmail?: (email: string, captchaToken: string) => void;
  requiredCaptcha?: boolean;
  submittingEmail?: boolean;
}

const Chat: FC<IChatProps> = ({
  messageData,
  onSend,
  isLoading,
  placeholder,
  suggestionList,
  hideInputIcon = false,
  attachFile = false,
  onSubmitEmail,
  requiredCaptcha,
  submittingEmail,
}) => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaErrorMessage, setCaptchaErrorMessage] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef?.current) {
      messageContainerRef.current.scrollTop = messageContainerRef?.current?.scrollHeight;
    }
  }, [messageData, messageContainerRef, isLoading]);

  const handleValidateCaptcha = () => {
    if (!captchaToken && requiredCaptcha) {
      setCaptchaErrorMessage(REQUIRED_MESSAGE);
      return false;
    } else {
      captchaErrorMessage && setCaptchaErrorMessage('');
      return true;
    }
  };

  const handleSelectSuggestion = (value: string) => {
    const isValid = handleValidateCaptcha();
    isValid && setSuggestion(value);
  };

  const handleSend = (value: string) => {
    const isValid = handleValidateCaptcha();
    isValid && onSend(value, captchaToken);
  };

  const handleSubmitEmail = (email: string) => {
    onSubmitEmail && onSubmitEmail(email, captchaToken);
  };

  return (
    <>
      <div ref={messageContainerRef} className="flex-1 overflow-auto md:px-8 md:pt-8 px-4 pt-4">
        <MessagesContainer
          data={messageData}
          isLoading={isLoading}
          submittingEmail={submittingEmail}
          onSubmitEmail={handleSubmitEmail}
        />
      </div>
      {requiredCaptcha && (
        <div className="md:px-8 px-4 pb-2">
          <Turnstile
            onSuccess={(token) => {
              setCaptchaToken(token);
            }}
            errorMessage={captchaErrorMessage}
          />
        </div>
      )}
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
