import { copyToClipboard } from '@/helpers/common';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import { FC, ReactNode, useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import ProductItem from './ProductItem';

interface IShareFormProps {
  product?: IRecommendationInfo;
}

interface IShareButton {
  children: ReactNode;
  url: string;
}

const MessageShareButton = (props: IShareButton) => {
  return (
    <a href={`sms:?&body=${props.url}`} target="_blank">
      {props.children}
    </a>
  );
};

const CopyLinkButton = (props: IShareButton) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    const isSuccess = await copyToClipboard(props.url);

    if (isSuccess) {
      setShowCopied(true);
    }

    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="hover:cursor-pointer relative" onClick={handleCopy}>
      {showCopied && (
        <p className="text-s text-gray-700 absolute -top-5 left-1/2 -translate-x-1/2">Copied!</p>
      )}
      {props.children}
    </div>
  );
};

const ShareForm: FC<IShareFormProps> = ({ product }) => {
  const productLink = `${window.location.origin}/app/${product?.type}/${product?.slug}`;

  const PLATFORMS = [
    {
      ShareButton: CopyLinkButton,
      label: 'Copy Link',
      icon: '/assets/icons/clipboard-document-icon.svg',
    },
    {
      ShareButton: EmailShareButton,
      label: 'Email',
      icon: '/assets/icons/mailbox-icon.svg',
    },
    {
      ShareButton: MessageShareButton,
      label: 'Message',
      icon: '/assets/icons/chat-bubble-icon.svg',
    },
    {
      ShareButton: WhatsappShareButton,
      label: 'Whatsapp',
      icon: '/assets/icons/whats-app-icon.svg',
    },
    // {
    //   label: 'Messenger',
    //   icon: '/assets/icons/messenger-icon.svg',
    // },
    {
      ShareButton: FacebookShareButton,
      label: 'Facebook',
      icon: '/assets/icons/facebook-icon.svg',
    },
    {
      ShareButton: TwitterShareButton,
      label: 'Twitter',
      icon: '/assets/icons/twitter-app-icon.svg',
    },
  ];

  return (
    <div className="w-full">
      <p className="text-s text-gray-700 mb-5">Share now</p>
      <ProductItem
        className="border !border-b border-gray-100 rounded-xl"
        product={product}
        hideActionButtons
      />
      <ul className="flex flex-wrap gap-x-4 gap-y-8 w-full mt-8">
        {PLATFORMS.map(({ icon, label, ShareButton }, index) => (
          <li key={index}>
            {ShareButton ? (
              <ShareButton url={productLink} title={product?.name}>
                <div
                  className="flex items-center first-line:rounded-xl py-3 border border-gray-200 w-[215px] rounded-xl justify-center hover:cursor-pointer"
                  data-href={productLink}
                  data-layout=""
                  data-size=""
                >
                  <img src={icon} alt="icon" />
                  <p className="ml-4 text-s text-black">{label}</p>
                </div>
              </ShareButton>
            ) : (
              <div className="flex items-center first-line:rounded-xl py-3 border border-gray-200 w-[215px] rounded-xl justify-center hover:cursor-pointer">
                <img src={icon} alt="icon" />
                <p className="ml-4 text-s text-black">{label}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareForm;
