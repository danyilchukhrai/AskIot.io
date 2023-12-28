import clsx from 'clsx';
import { FC } from 'react';
import { CustomNextImage } from '../CustomImage';

interface IAvatarProps {
  src: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  className?: string;
  firstName?: string;
  lastName?: string;
}

const Avatar: FC<IAvatarProps> = ({
  src,
  width = 40,
  height = 40,
  rounded = true,
  className = '',
  firstName = '',
  lastName = '',
}) => {
  if (firstName || lastName)
    return (
      <div
        className={clsx(
          'rounded-full w-10 h-10 bg-primary-700 text-white flex justify-center items-center font-medium border border-white',
          className,
        )}
      >
        {(firstName?.[0] || '').toUpperCase()}
        {(lastName?.[0] || '').toUpperCase()}
      </div>
    );
  return (
    <CustomNextImage
      className={clsx('object-cover block avatar', rounded ? 'rounded-full' : '', className)}
      alt="Avatar"
      {...{ width, height, src }}
    />
  );
};

export default Avatar;
