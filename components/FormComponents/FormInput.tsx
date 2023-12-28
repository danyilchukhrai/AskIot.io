import { FC, HTMLInputTypeAttribute } from 'react';
import Input, { IInputProps } from '../Input';
import { useController, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface IFormInputProps extends IInputProps {
  inputClassName?: string;
  type?: HTMLInputTypeAttribute;
}

const FormInput: FC<IFormInputProps> = (props) => {
  const {
    name = '',
    onChange: handleChange,
    inputClassName = '',
    type = 'text',
    className,
    value = '',
    ...rest
  } = props;
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
      <Input
        {...rest}
        {...inputProps}
        className={inputClassName}
        ref={ref}
        type={type}
        value={value}
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
