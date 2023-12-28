import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

interface IFeatureItemProps {
  imgSrc: string;
  title: string;
  description: string;
  child: string[];
  contentClassName?: string;
  reverse?: boolean;
}

const FeatureItem: FC<IFeatureItemProps> = ({
  imgSrc,
  title,
  description,
  child,
  contentClassName = '',
  reverse = false,
}) => {
  return (
    <div
      className={clsx(
        'feature-item flex items-center w-full',
        reverse ? 'flex-wrap-reverse' : 'flex-wrap',
        {
          'flex-row-reverse': reverse,
        },
      )}
    >
      <div
        className={clsx('image md:w-[52%] w-full', {
          'mt-6': reverse,
        })}
      >
        <Image
          className="w-full md:max-w-[613px] h-auto"
          src={imgSrc}
          width={613}
          height={382}
          alt="icon"
        />
      </div>
      <div className={clsx('content md:flex-1 w-full md:w-auto mt-6 md:mt-0', contentClassName)}>
        <p className="text-4xl md:text-[2.5rem] font-bold leading-[56px] text-gray-1200">{title}</p>
        <p className="text-gray-1300 text-l font-medium md:pt-5 md:pb-7.5 pt-4 pb-7">
          {description}
        </p>
        <ul className="flex flex-col">
          {child.map((item, index) => (
            <li
              className="text-gray-1200 text-base md:text-l flex items-center mb-4.5 last:mb-0"
              key={index}
            >
              <span className="block w-2 h-2 rounded-full bg-primary-500" />
              <span className="ml-2">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureItem;
