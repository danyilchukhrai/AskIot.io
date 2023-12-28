import clsx from 'clsx';
import { FC, HTMLProps, ReactNode, forwardRef, useRef } from 'react';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  endAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, endAdornment, inputClassName = '' } = props;

  return (
    <div className={clsx('flex flex-col', props.className)}>
      {label && <p className="text-gray-700 text-s mb-2">{label}</p>}
      <div className="input-field relative">
        <input
          ref={ref}
          {...props}
          className={clsx(
            'rounded-lg px-3 py-2.5 shadow-s text-gray-1000 text-base w-full',
            inputClassName,
            {
              'pr-9': !!endAdornment,
            },
          )}
        />
        {endAdornment && (
          <div className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer end-adornment h-fit">
            {endAdornment}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
