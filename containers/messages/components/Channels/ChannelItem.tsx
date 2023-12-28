import { CustomImg } from '@/components/CustomImage';
import { USER_TYPE } from '@/configs/routeConfig';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { IFirstPanelMessage } from '@/modules/message/types';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC } from 'react';

interface IChannelItemProps {
  channel: IFirstPanelMessage;
}

const ChannelItem: FC<IChannelItemProps> = ({ channel }) => {
  const { currentUserType } = useUserTypeContext();
  const isUser = currentUserType === USER_TYPE.USER;

  return (
    <div className="channel-item p-6 border-b border-gray-100 flex items-center">
      {isUser && (
        <CustomImg
          className="w-10 h-auto object-contain"
          src={channel.vendorlogo || DEFAULT_VENDOR_LOGO}
          alt="icon"
        />
      )}
      <div className="pl-3 flex-1">
        <div className="text-gray-1000 text-base font-medium flex justify-between">
          <span className="max-w-[125px] line-clamp-1">
            {isUser ? channel?.vendorname || 'Vendor name' : channel?.sendername}
          </span>
          <span
            className={clsx('text-s font-normal', {
              'text-gray-400': channel.isread,
            })}
          >
            {dayjs(channel.timestamp).format('MMM DD')}
          </span>
        </div>
        <p
          className={clsx(
            'text-s line-clamp-1 pt-1',
            !channel.isread ? 'text-primary-500 font-medium' : 'text-gray-600 font-normal',
          )}
        >
          {channel.messagecontent}
        </p>
      </div>
    </div>
  );
};

export default ChannelItem;
