import { FC } from 'react';
import { IInputProps } from '../Input';
import { useController, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

interface IDatePickerProps extends IInputProps {
  inputClassName?: string;
}

const FormDatePicker: FC<IDatePickerProps> = (props) => {
  const { name = '', onChange: handleChange, inputClassName = '', className, ...rest } = props;
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
      {rest?.label && <p className="text-gray-700 text-s mb-2">{rest?.label}</p>}
      <DatePicker
        className="w-full border-red rounded-lg shadow-s text-gray-1000 text-base px-3 py-2.5"
        wrapperClassName="w-full"
        ref={ref}
        minDate={subDays(new Date(), 0)}
        name={inputProps?.name}
        selected={inputProps?.value}
        onChange={(e) => {
          onChange(e);
          handleChange && handleChange(e as any);
        }}
      />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormDatePicker;
