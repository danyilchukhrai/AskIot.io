import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { ENTER_KEY } from '@/constants/common';
import clsx from 'clsx';

interface ISearchBoxProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  suggestion?: string;
  hideInputIcon?: boolean;
  attachFile?: boolean;
}

const SearchBox: FC<ISearchBoxProps> = ({
  placeholder = 'Search anything...',
  onChange,
  onSearch,
  suggestion = '',
  hideInputIcon = false,
  attachFile = false,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (suggestion) {
      setValue(suggestion);
      inputRef?.current?.focus();
    }
  }, [suggestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleSearch = () => {
    if (!onSearch || !value) return;
    onSearch(value);
    setValue('');
  };

  return (
    <div className="flex items-center w-full py-2.5 px-3 bg-white rounded-xl shadow-search-box h-12.5">
      <div className="flex items-center flex-1">
        {!hideInputIcon && (
          <Image
            className="w-5 h-5"
            src="/assets/logo/logo.svg"
            width={20}
            height={20}
            alt="AskIoT"
          />
        )}
        <input
          ref={inputRef}
          className={clsx(
            'flex-1 h-5 text-base placeholder:text-gray-500 placeholder:font-normal outline-none',
            {
              'ml-3': !hideInputIcon,
            },
          )}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === ENTER_KEY) {
              handleSearch();
            }
          }}
        />
      </div>
      {attachFile && (
        <Button className="mr-6" variant="inline" disabledPadding onClick={handleSearch}>
          <Image
            className="w-5 h-5"
            src="/assets/icons/paper-clip-icon.svg"
            width={20}
            height={20}
            alt="AskIoT"
          />
        </Button>
      )}
      <Button variant="inline" disabledPadding onClick={handleSearch}>
        <Image
          className="w-5 h-5"
          src="/assets/icons/paper-airplane-icon.svg"
          width={20}
          height={20}
          alt="AskIoT"
        />
      </Button>
    </div>
  );
};

export default SearchBox;
