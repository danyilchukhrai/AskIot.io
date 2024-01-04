import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Input, { IInputProps } from '../Input';

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
        name={name}
        className={inputClassName}
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
