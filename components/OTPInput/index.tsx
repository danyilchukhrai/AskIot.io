import {
  ChangeEvent,
  ClipboardEvent,
  HTMLAttributes,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface IOTPInputProps extends HTMLAttributes<HTMLDivElement> {}

export interface IOTPInputElement {
  getValue: () => string;
}

const OTP_REGEX = /^\d{6}$/;
const DEFAULT_VALUE = ['', '', '', '', '', ''];

const OTPInput = forwardRef<IOTPInputElement, IOTPInputProps>((props, ref) => {
  const [otp, setOtp] = useState<string[]>(DEFAULT_VALUE);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useImperativeHandle(ref, () => ({
    getValue: () => otp.join(''),
  }));

  const handleCheckFilled = (otp: string[]) => {
    const isFilledNow = otp.every((value) => value !== '');
    if (isFilledNow !== isFilled) {
      setIsFilled(isFilledNow);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const newOtp = [...otp];
    newOtp[Number(name)] = value;
    if (value.length <= 1) {
      setOtp(newOtp);

      if (value.length === 1) {
        if (Number(name) < 5) {
          inputRefs.current[Number(name) + 1].focus();
        }
      }
      handleCheckFilled(newOtp);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    if (OTP_REGEX.test(pasteData)) {
      const newOtp = Array.from(pasteData);
      setOtp(newOtp);
      handleCheckFilled(newOtp);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '+' || event.key === '-') {
      event.preventDefault();
    }

    if (event.key === 'Backspace') {
      const { name } = event.target as HTMLInputElement;
      if (Number(name) > 0 && otp[Number(name)] === '') {
        const newOtp = [...otp];
        newOtp[Number(name) - 1] = '';
        setOtp(newOtp);
        inputRefs.current[Number(name) - 1].focus();
      }
    }
  };
  return (
    <div {...props}>
      <p className="text-base text-gray-1000">Enter OTP:</p>
      <div className="flex gap-5 mt-4">
        {otp.map((value, index) => (
          <div className="flex-1" key={index}>
            <input
              name={String(index)}
              type="number"
              pattern="[0-9]*"
              maxLength={1}
              value={value}
              onChange={handleChange}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              ref={(ref) => {
                inputRefs.current[index] = ref as HTMLInputElement;
              }}
              className="w-full border-2 rounded-[10px] md:text-2xl text-xl md:px-4 md:py-[10px] py-1 text-center font-medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default OTPInput;
