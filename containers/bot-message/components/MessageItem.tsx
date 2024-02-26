import Avatar from '@/components/Avatar';
import { IChatQueryRecommendation } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import { FC, useContext, useState } from 'react';
import { ProductsContext } from '../context';
import FeedbackBadge from './FeedbackBadge'; 


interface IMessageItemProps {
  isCurrentUser?: boolean;
  aiLogo?: string;
  content: string;
  recommendations?: IChatQueryRecommendation;
  isLoading?: boolean;
  senderFirstName?: string;
  senderLastName?: string;
  isUser?: boolean;
  id?: number;
  feedback?: boolean; 

}

const MessageItem: FC<IMessageItemProps> = ({
  content = '',
  isCurrentUser = false,
  recommendations,
  isLoading,
  aiLogo: aiLogoProp = '',
  senderFirstName,
  senderLastName,
  isUser,
  id,
  feedback,
}) => {
  const {
    botIcon,
    userIcon
  } = useContext(ProductsContext);

  let imgSrc = '/assets/logo/logo.svg';
  const aiLogo = aiLogoProp || '/assets/logo/logo.svg';

  // Apply this flow for user type or iot gpt chat
  if (isUser) {
    if (!userIcon) {
      imgSrc = '/assets/images/avatar-default.png';
    } else {
      imgSrc = userIcon;
    }
  } else {
    if (!botIcon) {
      imgSrc = '/assets/logo/logo.svg';
    } else {
      imgSrc = botIcon;
    }
  }

  return (
    <div className={clsx('flex flex-col', { 'items-end': !isUser })}>

    <div className={clsx('flex items-start', !isUser ? 'justify-end': '')}>
      <Avatar
        src={imgSrc}
        className={clsx('w-8 h-8 md:w-10 md:h-10', isUser ? 'md:mr-6 mr-3' : 'md:mr-6 mr-3')}
        firstName={senderFirstName}
        lastName={senderLastName}
      />
      
      <div
        className={clsx({
          'flex justify-start': !isUser,
          'flex-1': isUser
        })}
      >
        {isLoading ? (
          <div className="w-8 h-8 flex justify-center items-center">
            <span className="dot-flashing inline-block" />
          </div>
        ) : (
          <>
            <div
              className={clsx(
                'py-2.5 px-3 rounded-lg w-fit shadow-s',
                isCurrentUser ? 'text-white bg-primary-500 ' : 'text-black bg-white ',
              )}
            >
              <div
                className={clsx('md:text-base text-s w-fit break-word chat-inner-html')}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          
            
          </>
          
        )}
      </div>
      
        </div>
         {/* Conditionally render FeedbackBadge */}
         {feedback !== undefined && (
    <div className="mt-1 self-end pr-2"> {/* Adjust margin and padding as needed */}
      <FeedbackBadge feedback={feedback} />
    </div>
  )}


    </div>
  );
};

export default MessageItem;
