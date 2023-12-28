import { CustomNextImage } from '@/components/CustomImage';
import { FC } from 'react';

interface IMemberItemProps {
  avatarSrc: string;
  position: string;
  name: string;
}

const MemberItem: FC<IMemberItemProps> = ({ avatarSrc, position, name }) => {
  return (
    <div className="flex items-center">
      <CustomNextImage
        className="w-8 h-8 rounded-full"
        src={avatarSrc || ''}
        width={32}
        height={32}
        alt=""
      />
      <div className="ml-3">
        <p className="text-gray-1000 text-s font-medium">{name}</p>
        <p className="text-gray-500 text-xs mt-0.5">{position}</p>
      </div>
    </div>
  );
};

export default MemberItem;
