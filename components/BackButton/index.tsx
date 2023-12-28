import { FC } from 'react';
import Button, { IButtonProps } from '../Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface IBackButtonProps extends IButtonProps {}

const BackButton: FC<IBackButtonProps> = ({
  onClick,
  className,
  variant = 'secondary',
  ...rest
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      {...rest}
      className={clsx('flex', className)}
      variant={variant}
      onClick={onClick || handleBack}
    >
      <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
      <span className="ml-2.5">Back</span>
    </Button>
  );
};

export default BackButton;
