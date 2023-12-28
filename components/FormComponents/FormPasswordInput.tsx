import { FC, useState } from 'react';
import { IInputProps } from '../Input';
import FormInput from './FormInput';
import Button from '../Button';

interface IFormPasswordInputProps extends IInputProps {}

const FormPasswordInput: FC<IFormPasswordInputProps> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <FormInput
      {...props}
      type={isShowPassword ? 'text' : 'password'}
      placeholder="••••••••"
      endAdornment={
        <div onClick={() => setIsShowPassword((prev) => !prev)}>
          <img
            className="w-5 h-5"
            src={
              isShowPassword
                ? '/assets/icons/eye-slash-icon.svg'
                : '/assets/icons/eye-password-icon.svg'
            }
          />
        </div>
      }
    />
  );
};

export default FormPasswordInput;
