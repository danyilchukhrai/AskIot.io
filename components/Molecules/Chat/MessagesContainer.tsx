import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { useUserContext } from '@/providers/UserProvider';
import { FC, Fragment } from 'react';
import EmailFormMessage from './EmailFormMessage';
import MessageItem from './MessageItem';

interface IMessagesContainerProps {
  data?: IThreadInteraction[];
  isLoading?: boolean;
  onSubmitEmail?: (email: string) => void;
  submittingEmail?: boolean;
}

const MessagesContainer: FC<IMessagesContainerProps> = ({
  data = [],
  isLoading,
  onSubmitEmail,
  submittingEmail = false,
}) => {
  const { askIOTUserDetails } = useUserContext();

  return (
    <div className="h-full">
      {data.map((item, index) => (
        <Fragment key={item.id}>
          <div className="mb-5 last:mb-0">
            <MessageItem
              content={item.user}
              senderFirstName={askIOTUserDetails?.first_name}
              senderLastName={askIOTUserDetails?.last_name}
              isCurrentUser
              isUser
              id={item.id}
            />
          </div>
          {item.ai && (
            <>
              <div className="mb-5 last:mb-0">
                <MessageItem
                  content={item.ai}
                  aiLogo={item?.aiLogo}
                  recommendations={item.recommendations}
                  id={item.id}
                  isCurrentUser={false}
                  isUser
                />
              </div>
              {item?.is_email && (
                <div className="mb-5 last:mb-0">
                  <EmailFormMessage
                    submittingEmail={submittingEmail}
                    onSubmitEmail={onSubmitEmail}
                    aiLogo={item?.aiLogo}
                    id={item?.id}
                    messageData={data}
                  />
                </div>
              )}
            </>
          )}
        </Fragment>
      ))}
      {isLoading && !submittingEmail && (
        <MessageItem content="" aiLogo={data?.[0]?.aiLogo} isLoading isCurrentUser={false} isUser />
      )}
    </div>
  );
};

export default MessagesContainer;
