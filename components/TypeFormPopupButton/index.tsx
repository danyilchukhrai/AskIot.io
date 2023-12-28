import { FC } from 'react';
import { IButtonProps } from '../Button';
import { PopupButton } from '@typeform/embed-react';
import clsx from 'clsx';

interface ITypeFormPopupButtonProps extends IButtonProps {
  typeformId: string;
}

const TypeFormPopupButton: FC<ITypeFormPopupButtonProps> = ({
  typeformId,
  children,
  variant = 'primary',
  disabledPadding = false,
  className,
  fullWidth = false,
}) => {
  return (
    <PopupButton
      id={typeformId}
      className={clsx(
        'text-base font-medium rounded-lg',
        {
          'shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400':
            variant === 'primary',
          'shadow-s text-gray-800 bg-white hover:bg-gray focus:ring-1 focus:ring-black disabled:bg-gray disabled:text-gray-300':
            variant === 'secondary',
          'text-gray-1000 hover:text-black focus:bg-gray focus:text-black disabled:text-gray-200':
            variant === 'inline',
          'text-white bg-primary-500': variant === 'info',
        },
        disabledPadding ? 'p-0' : 'px-3 py-2.5',
        fullWidth ? 'w-full' : 'w-fit',
        className,
      )}
      transitiveSearchParams
      iframeProps={{
        title: 'Signup Form for Application',
        style: 'height: 500px;',
      }}
      medium="snippet"
      opacity={100}
    >
      {children}
    </PopupButton>
  );
};

export default TypeFormPopupButton;
