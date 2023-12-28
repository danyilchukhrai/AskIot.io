import { DEFAULT_IMG } from '@/constants/common';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type NextImagePropsWithoutSrc = Omit<ImageProps, 'src' | 'width' | 'height'>;

interface ICustomImageProps extends NextImagePropsWithoutSrc {
  src?: string;
  width?: number;
  height?: number;
}

const CustomNextImage: React.FunctionComponent<ICustomImageProps> = ({
  src = '',
  width = 100,
  height = 100,
  ...rest
}) => {
  const [isError, setIsError] = React.useState(false);

  return (
    <Image
      {...rest}
      src={isError ? DEFAULT_IMG : src || DEFAULT_IMG}
      width={width}
      height={height}
      onErrorCapture={() => setIsError(true)}
    />
  );
};

const CustomImg: React.FunctionComponent<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ src = '', className, ...rest }) => {
  const [isError, setIsError] = React.useState(false);

  return (
    <img
      {...rest}
      src={isError ? DEFAULT_IMG : src || DEFAULT_IMG}
      onErrorCapture={() => setIsError(true)}
      className={clsx((isError || !src) && 'max-w-9 max-h-12.5', className)}
    />
  );
};

export { CustomImg, CustomNextImage };
