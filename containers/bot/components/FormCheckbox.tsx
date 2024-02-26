import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface IFormCheckboxProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  controlLabel?: ReactNode;
  isToggle?: boolean;
}

const FormCheckBox: React.FC<IFormCheckboxProps> = ({
  name = '',
  onChange: handleChange,
  label,
  inputClassName = '',
  controlLabel = '',
  isToggle = false,
  value,
  checked,
  ...rest
}) => {
  const checkboxId = uuidv4();

  return (
    <div className="w-full">
      {isToggle ? (
        <label htmlFor={checkboxId} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              value={value}
              id={checkboxId}
              name={name}
              className={clsx('toggle-input sr-only', inputClassName)}
              type="checkbox"
              onChange={(e) => {
                handleChange && handleChange(e);
              }}
            />
            <div className="block bg-gray-1500 w-5 h-3 rounded-[6px]"></div>
            <div className="dot absolute right-0.5 top-1/2 -translate-y-1/2 bg-white w-[8.5px] h-[8.5px] rounded-full transition"></div>
          </div>
          <p className="ml-2 text-gray-700 text-[16px]">{label}</p>
        </label>
      ) : (
        <div className="flex items-center gap-2">
          <input
            value={value}
            id={checkboxId}
            name={name}
            className={clsx('checkbox-input', inputClassName)}
            type="checkbox"
            onChange={(e) => {
              handleChange && handleChange(e);
            }}
            checked={checked}
          />
          {label && (
            <label className="text-[16px] text-gray-700 hover:cursor-pointer" htmlFor={checkboxId}>
              {label}
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default FormCheckBox;
