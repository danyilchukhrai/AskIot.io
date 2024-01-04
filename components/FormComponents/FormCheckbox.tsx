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
  ...rest
}) => {
  const { control } = useFormContext();
  const checkboxId = uuidv4();

  const {
    field: { onChange, value, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  const formValue = typeof value === 'string' ? value === 'true' : value;

  return (
    <div className="w-full">
      {isToggle ? (
        <label htmlFor={checkboxId} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              {...inputProps}
              {...rest}
              value={formValue}
              id={checkboxId}
              name={name}
              className={clsx('toggle-input sr-only', inputClassName)}
              type="checkbox"
              onChange={(e) => {
                onChange(e);
                handleChange && handleChange(e);
              }}
              checked={formValue}
            />
            <div className="block bg-gray-1500 w-5 h-3 rounded-[6px]"></div>
            <div className="dot absolute right-0.5 top-1/2 -translate-y-1/2 bg-white w-[8.5px] h-[8.5px] rounded-full transition"></div>
          </div>
          <p className="ml-2 text-gray-700 text-s">{label}</p>
        </label>
      ) : (
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            {...rest}
            value={formValue}
            id={checkboxId}
            name={name}
            className={clsx('checkbox-input', inputClassName)}
            type="checkbox"
            onChange={(e) => {
              onChange(e);
              handleChange && handleChange(e);
            }}
            checked={formValue}
          />
          {label && (
            <label className="text-s text-gray-700 hover:cursor-pointer" htmlFor={checkboxId}>
              {label}
            </label>
          )}
        </div>
      )}
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormCheckBox;
