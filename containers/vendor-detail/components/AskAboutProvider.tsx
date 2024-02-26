import Button from '@/components/Button';
import Chat from '@/components/Molecules/Chat';
import { handleShowError } from '@/helpers/common';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { useChatVendorQuery, usePublicChatVendorQuery } from '@/modules/vendors/hooks';
import { useAuthContext } from '@/providers/AuthProvider';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

interface IVendorChatProps {
  setIsOpenChat: Dispatch<SetStateAction<boolean>>;
  vendorId?: number;
  vendorLogo?: string;
}

const SUGGESTION = [
  'what are the key features?',
  'what are the usecases supported',
  'What verticals are supported',
];

const threadId = uuidv4();

const VendorChat: FC<IVendorChatProps> = ({ setIsOpenChat, vendorId, vendorLogo }) => {
  const { user } = useAuthContext();
  const [messageData, setMessageData] = useState<IThreadInteraction[]>([]);
  const [requiredCaptcha, setRequiredCaptcha] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const { mutate: chatVendorQuery, isPending: querying } = useChatVendorQuery();
  const { mutate: publicChatVendorQuery, isPending: publicVendorQuerying } =
    usePublicChatVendorQuery();

  useEffect(() => {
    if (!user) {
      setRequiredCaptcha(true);
    }
  }, [user]);

  const handleSendMessage = (value: string, captchaToken: string) => {
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
    setRequiredCaptcha(false);

    if (user) {
      chatVendorQuery(
        {
          vendorId,
          query: value,
          threadId,
        },
        {
          onSuccess: (data) => {
            updateMessageDataAfterQuery(data, newMessageData);
          },
          onError: handleShowError,
        },
      );
    } else {
      publicChatVendorQuery(
        {
          vendorId,
          query: value,
          threadId,
          is_email: false,
          'cf-turnstile-response': captchaToken,
        },
        {
          onSuccess: (data) => updateMessageDataAfterQuery(data, newMessageData),
          onError: handleShowError,
        },
      );
    }
  };

  const updateMessageDataAfterQuery = (data: any, messageData: IThreadInteraction[]) => {
    // Update message data with aiResponse after query successfully
    const newMessageData = [...messageData];
    const latestMessage = newMessageData[newMessageData.length - 1];
    latestMessage.ai = data?.response || data?.greeting || '';
    latestMessage.is_email = data?.is_email;
    setMessageData(newMessageData);
  };

  const getConversationHistory = (): string[] => {
    return messageData?.reduce((prev: string[], currentItem) => {
      const result = [...prev];
      currentItem.user && result.push(`User: ${currentItem.user}`);
      currentItem.ai && result.push(currentItem.ai);

      return result;
    }, []);
  };

  const handleSubmitEmail = (email: string, captchaToken: string) => {
    setSubmittingEmail(true);
    publicChatVendorQuery(
      {
        vendorId: vendorId,
        query: email,
        threadId,
        is_email: true,
        'cf-turnstile-response': captchaToken,
      },
      {
        onSuccess: (data) => {
          const successMessage = data.greeting || 'Thank you. A member of the team will reach out to you!'; 
          toast.success(successMessage);
        },
        onError: handleShowError,
        onSettled: () => setSubmittingEmail(false),
      },
    );
  };

  return (
    <div className="md:h-screen h-[calc(100vh-79px)] max-h-screen flex flex-col">
      <div className="flex items-center justify-between p-8 border-b border-gray-200">
        <p className="text-gray-1000 text-l font-medium">Ask anything about this provider</p>
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
          isLoading={querying || publicVendorQuerying}
          placeholder="Ask anything about this product..."
          suggestionList={SUGGESTION}
          requiredCaptcha={requiredCaptcha}
          submittingEmail={submittingEmail}
          onSubmitEmail={handleSubmitEmail}
        />
      </div>
    </div>
  );
};

export default VendorChat;
