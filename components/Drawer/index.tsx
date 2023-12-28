import { useClickOutside } from '@/hooks/useClickOutside';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Button from '../Button';

type DrawerPlacement = 'right' | 'left';

interface IDrawerProps {
  children: ReactNode;
  placement?: DrawerPlacement;
  disabledPaddingX?: boolean;
  disabledPaddingY?: boolean;
  className?: string;
  closeIconClassName?: string;
  closeOnClickOutside?: boolean;
}

export interface IDrawerElement {
  open: () => void;
  close: () => void;
}

const Drawer = forwardRef<IDrawerElement, IDrawerProps>(
  (
    {
      children,
      placement = 'right',
      disabledPaddingX = false,
      disabledPaddingY = false,
      className = '',
      closeIconClassName = '',
      closeOnClickOutside = true,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    const handleCloseDrawer = () => {
      setIsOpen(false);
    };

    useClickOutside(contentRef, () => {
      if (closeOnClickOutside) {
        handleCloseDrawer();
      }
    });

    return (
      <div
        className={clsx(
          'fixed overflow-hidden z-20 bg-black bg-opacity-20 inset-0 transform ease-in-out flex',
          isOpen
            ? 'transition-opacity opacity-100 duration-500 translate-x-0  '
            : 'delay-200 opacity-0 translate-x-full',
          placement === 'right' ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          className={clsx(
            'bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform relative z-30 w-full md:w-auto',
            isOpen ? ' translate-x-0 ' : 'translate-x-full',
            {
              'px-8': !disabledPaddingX,
              'py-8': !disabledPaddingY,
            },
            className,
          )}
          ref={contentRef}
        >
          {isOpen ? children : <div className="w-md:w-[506px] lg:w-[652px] w-full" />}
          <Button
            className={clsx('absolute top-8 md:right-8 right-4 w-fit bg-white', closeIconClassName)}
            variant="inline"
            disabledPadding
            onClick={handleCloseDrawer}
          >
            <Image src="/assets/icons/x-mark-icon.svg" alt="X mark icon" width={24} height={24} />
          </Button>
        </div>
      </div>
    );
  },
);

export default Drawer;
