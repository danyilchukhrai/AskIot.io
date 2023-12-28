import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';

interface IFormRadioProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  controlLabel?: ReactNode;
}

const FormRadio: React.FC<IFormRadioProps> = ({
  name = '',
  onChange: handleChange,
  label,
  inputClassName = '',
  controlLabel = '',
  ...rest
}) => {
  const { control } = useFormContext();

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
          onChange(e);
          handleChange && handleChange(e);
        }}
      />
      {controlLabel && controlLabel}
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormRadio;
