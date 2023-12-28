import { formatPhoneNumber } from '@/helpers/common';
import { ChangeEvent, forwardRef, useState } from 'react';
import Input, { IInputProps } from '../Input';

type IInputPropsWithoutOnChange = Omit<IInputProps, 'onChange'>;

export interface IPhoneInputProps extends IInputPropsWithoutOnChange {
  onChange?: (phoneValue: string) => void;
}

const PhoneInput = forwardRef<HTMLInputElement, IPhoneInputProps>(({ onChange, ...rest }, ref) => {
  const [value, setValue] = useState('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatValue = formatPhoneNumber(value);

    setValue(formatValue);
    onChange && onChange(formatValue);
  };

  return <Input {...rest} ref={ref} value={value} onChange={handlePhoneChange} maxLength={12} />;
});

export default PhoneInput;
