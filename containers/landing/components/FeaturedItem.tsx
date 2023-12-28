import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface IFeaturedItemProps {
  reverse?: boolean;
  ImageComponent: ReactNode;
  className?: string;
  title: ReactNode;
  description: ReactNode;
  contentClassName?: string;
}

const FeaturedItem: FC<IFeaturedItemProps> = ({
  reverse = false,
  ImageComponent,
  className = '',
  contentClassName = '',
  title,
  description,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        reverse ? 'flex-wrap-reverse' : 'flex-wrap',
        {
          'flex-row-reverse': reverse,
        },
        className,
      )}
    >
      <div className={clsx('content w-full md:w-[35%]', contentClassName)}>
        <p className="text-4xl md:text-[2.5rem] text-black font-bold -tracking-[1.6px] md:leading-normal">
          {title}
        </p>
        <Image
          className="my-4 md:my-8"
          src="/assets/logo/logo.svg"
          width={28}
          height={28}
          alt="AskIoT"
        />
        <p className="text-gray-600 text-xl md:text-2xl">{description}</p>
      </div>
      {ImageComponent}
    </div>
  );
};

export default FeaturedItem;
