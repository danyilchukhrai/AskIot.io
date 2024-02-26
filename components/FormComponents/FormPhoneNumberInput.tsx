import clsx from 'clsx';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { IInputProps } from '../Input';

interface IFormPhoneNumberInputProps extends IInputProps {
  inputClassName?: string;
}

const FormPhoneNumberInput: FC<IFormPhoneNumberInputProps> = (props) => {
  const { name = '', inputClassName = '', className, label, ...rest } = props;
  const { control, setValue } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={clsx('w-full input-container', className)}>
      {label && <p className="text-gray-700 text-lg mb-2">{label}</p>}
      <PhoneInput
        {...field}
        international
        countryCallingCodeEditable={false}
        defaultCountry="US"
        name={name}
        className="phone-number-input"
      />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormPhoneNumberInput;
