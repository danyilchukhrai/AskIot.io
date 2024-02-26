import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Input, { IInputProps } from '../Input';

interface IFormInputProps extends IInputProps {
  inputClassName?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  boldLabel?: boolean;
}

const FormInput: FC<IFormInputProps> = ({
  name = '',
  onChange: handleChange,
  type = 'text',
  className,
  label,
  boldLabel = false, // Default to false if not provided
  ...rest
}) => {
  const { control } = useFormContext();
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={clsx('w-full input-container', className)}>
      {label && ( // Conditionally render the label if it exists
        <label
          htmlFor={name}
          className={clsx('form-label', { 'font-bold': boldLabel })} // Apply 'font-bold' based on boldLabel prop
        >
          {label}
        </label>
      )}
      <Input
        {...rest}
        {...inputProps}
        name={name}
        ref={ref}
        type={type}
        onChange={(e) => {
          onChange(e);
          handleChange && handleChange(e);
        }}
      />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormInput;
