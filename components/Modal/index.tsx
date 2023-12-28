import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import Button from '../Button';
import Portal from '../PagePortal';

interface IModalProps {
  title?: string;
  children: ReactNode;
  secondaryButtonLabel?: string;
  primaryButtonLabel?: string;
  onSubmit?: () => void;
  hideButtons?: boolean;
  paperClassName?: string;
  onClose?: () => void;
}

export interface IModalElement {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<IModalElement, IModalProps>(
  (
    {
      title = '',
      children,
      secondaryButtonLabel = 'Cancel',
      primaryButtonLabel = 'Ok',
      hideButtons = false,
      onSubmit,
      paperClassName = '',
      onClose,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: handleCloseModal,
    }));

    const handleCloseModal = () => {
      setIsOpen(false);
      onClose && onClose();
    };

    if (!isOpen) return <></>;

    return (
      <Portal>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 z-50 flex justify-center items-center overflow-auto md:py-3">
          <div
            className={clsx(
              'md:py-8 py-4 rounded-xl md:w-[576px] w-[350px] bg-white max-h-full flex flex-col',
              paperClassName,
            )}
          >
            <div
              className={clsx(
                'header flex  items-center md:px-8 px-4 mb-4 md:mb-8',
                title ? 'justify-between' : 'justify-center',
              )}
            >
              {title && <p className="md:text-3xl text-2xl text-gray-1000">{title}</p>}
              <Button
                variant="inline"
                disabledPadding
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
              >
                <Image
                  src="/assets/icons/x-mark-icon.svg"
                  alt="X mark icon"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div
              className={clsx('flex-1 overflow-auto md:px-8 px-4', hideButtons ? 'mb-0' : 'mb-8')}
            >
              {children}
            </div>
            {!hideButtons && (
              <div className="grid grid-cols-2 gap-4 md:px-8 px-4">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseModal();
                  }}
                  fullWidth
                >
                  {secondaryButtonLabel}
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubmit && onSubmit();
                  }}
                  fullWidth
                >
                  {primaryButtonLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Portal>
    );
  },
);

export default Modal;
