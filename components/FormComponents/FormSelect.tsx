import clsx from 'clsx';
import { FC, HTMLProps } from 'react';
import { useController, useFormContext } from 'react-hook-form';

export interface ISelectOption {
  value: string | number;
  label: string;
}
interface IFormSelect extends HTMLProps<HTMLSelectElement> {
  label?: string;
  options?: ISelectOption[] | string[];
  placeholder?: string;
}

const FormSelect: FC<IFormSelect> = (props) => {
  const {
    name = '',
    onChange: handleChange,
    className,
    label,
    placeholder,
    options = [],
    ...rest
  } = props;
  const { control, watch } = useFormContext();
  const {
    field: { onChange, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const watchValue = watch(name);
  const isPlaceHolder = !options
    .map((it) => (typeof it === 'string' ? it : it?.value))
    .includes(watchValue);

  return (
    <div className={clsx('w-full input-container flex flex-col', className)}>
      {label && <p className="text-gray-700 text-s mb-2">{label}</p>}
      <select
        {...rest}
        {...inputProps}
        value={value}
        name={name}
        onChange={(e) => {
          onChange(e);
          handleChange && handleChange(e);
        }}
        className={clsx(
          'py-2.5 px-3 pr-8 border-0 shadow-s rounded-lg custom-select-arrow appearance-none text-base',
          isPlaceHolder ? 'text-gray-500' : 'text-gray-1000',
        )}
      >
        {placeholder && (
          <option className="!text-gray-500" value="" hidden selected>
            {placeholder}
          </option>
        )}
        {options.map((it, index) => (
          <option key={index} value={typeof it === 'string' ? it : it.value}>
            {typeof it === 'string' ? it : it.label}
          </option>
        ))}
      </select>
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormSelect;
