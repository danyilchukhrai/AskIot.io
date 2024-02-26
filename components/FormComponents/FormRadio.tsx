import clsx from 'clsx';
import { FC, HTMLProps, ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IFormRadioProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  controlLabel?: ReactNode;
  hideErrorMsg?: boolean;
  isBooleanValue?: boolean;
}

export const RadioControlLabel: FC<HTMLProps<HTMLLabelElement>> = ({
  htmlFor,
  children,
  className,
  ...rest
}) => (
  <label
    {...rest}
    className={clsx(
      'hover:cursor-pointer shadow-s px-3 py-2.5 rounded-lg text-base text-gray-1000 peer-checked:bg-primary-500 peer-checked:text-white block',
      className,
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

const FormRadio: React.FC<IFormRadioProps> = ({
  name = '',
  onChange: handleChange,
  label,
  inputClassName = '',
  controlLabel = '',
  hideErrorMsg = false,
  isBooleanValue,
  ...rest
}) => {
  const { control, watch } = useFormContext();

  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });


  return (
    <div className="w-full">
      <input
        {...inputProps}
        {...rest}
        name={name}
        className={clsx('radio-input', inputClassName)}
        type="radio"
        onChange={(e) => {
          const value = e.target.value;
          const formattedValue = isBooleanValue ? value === 'true' : value;
          onChange(formattedValue);
          handleChange && handleChange(e);
        }}
        checked={rest.value === watch(name)}
      />
      {controlLabel && controlLabel}
      {invalid && !hideErrorMsg && (
        <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>
      )}
    </div>
  );
};

export default FormRadio;
