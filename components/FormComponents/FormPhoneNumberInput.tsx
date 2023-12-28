import clsx from 'clsx';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import PhoneInput, { IPhoneInputProps } from '../PhoneInput';

interface IFormPhoneNumberInputProps extends IPhoneInputProps {
  inputClassName?: string;
}

const FormPhoneNumberInput: FC<IFormPhoneNumberInputProps> = (props) => {
  const { name = '', inputClassName = '', className, ...rest } = props;
  const { control } = useFormContext();
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={clsx('w-full input-container', className)}>
      <PhoneInput {...rest} {...inputProps} className={inputClassName} ref={ref} />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormPhoneNumberInput;
