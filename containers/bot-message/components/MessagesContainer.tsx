import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { useUserContext } from '@/providers/UserProvider';
import { FC, Fragment } from 'react';
import { ProductsContext } from '../context';
import MessageItem from './MessageItem';

interface IMessagesContainerProps {
  data?: IThreadInteraction[];
  isLoading?: boolean;
}

const MessagesContainer: FC<IMessagesContainerProps> = ({ data = [], isLoading }) => {
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
            <div className="mb-5 last:mb-0">
              <MessageItem
                content={item.ai}
                aiLogo={item?.aiLogo}
                recommendations={item.recommendations}
                id={item.id}
                isUser={false}
                feedback={item.feedback} // Pass feedback to MessageItem

              />
            </div>
          )}
        </Fragment>
      ))}
      {isLoading && <MessageItem content="" aiLogo={data?.[0]?.aiLogo} isLoading />}
    </div>
  );
};

export default MessagesContainer;
