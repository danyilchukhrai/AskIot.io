import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IFormRadioProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  controlLabel?: ReactNode;
  hideErrorMsg?: boolean;
  isBooleanValue?: boolean;
}

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
  const { control } = useFormContext();

  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  console.log(inputProps.value);

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
      />
      {controlLabel && controlLabel}
      {invalid && !hideErrorMsg && (
        <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>
      )}
    </div>
  );
};

export default FormRadio;
