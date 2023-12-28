import { FC, ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface IInfoItemProps {
  iconSrc: string;
  label?: ReactNode;
  className?: string;
}

const InfoItem: FC<IInfoItemProps> = ({ iconSrc, label = '', className = '' }) => {
  return label ? (
    <div className={clsx('flex items-center', className)}>
      <Image src={iconSrc || ''} width={20} height={20} alt="" />
      <p className="ml-1.5">{label}</p>
    </div>
  ) : null;
};

export default InfoItem;
