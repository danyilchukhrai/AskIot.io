import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import clsx from 'clsx';

export interface IDropdownMenuItem {
  icon?: ReactNode;
  label: ReactNode;
  onAction: () => void;
}

interface IDropdownButtonProps {
  dropdownMenu?: IDropdownMenuItem[];
  className?: string;
  menuPlacement?: 'bottom' | 'top';
  icon?: string;
}

const DropdownButton: FC<IDropdownButtonProps> = ({
  className = '',
  dropdownMenu,
  menuPlacement = 'bottom',
  icon = '/assets/icons/ellipsis-horizontal-icon.svg'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    !isOpen && (document.body.style.overflow = 'auto');
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        isOpen && setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, isOpen]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!dropdownMenu?.length) return;
    e.stopPropagation();
    document.body.style.overflow = 'hidden';
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        className={className}
        variant="inline"
        disabledPadding
        onClick={handleClick}
      >
        <Image src={icon} width={24} height={24} alt="Icon" />
      </Button>
      {isOpen && (
        <ul
          ref={ref}
          className={clsx('shadow rounded-xl bg-white min-w-[165px] fixed z-20', {
            'translate-y-6 translate-x-[calc(-100%+24px)]': menuPlacement === 'bottom',
            '-translate-y-full': menuPlacement === 'top',
          })}
          style={{
            top: buttonRef.current?.getBoundingClientRect().top,
            left: buttonRef.current?.getBoundingClientRect().left,
          }}
        >
          {(dropdownMenu || []).map((menuItem, index) => (
            <li
              className="text-base text-gray-800 font-medium flex items-center py-2.5 px-4 hover:bg-gray cursor-pointer"
              key={index}
              onClick={() => {
                setIsOpen(false);
                menuItem.onAction();
              }}
            >
              {menuItem.icon}
              <span className="ml-3">{menuItem.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DropdownButton;
