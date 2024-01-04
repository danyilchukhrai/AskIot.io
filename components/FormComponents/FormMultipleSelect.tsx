import clsx from 'clsx';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Select from 'react-select';

export interface IMultiSelectItem {
  label: string;
  value: string | number;
}

export interface GroupedOption {
  label: string;
  options: IMultiSelectItem[];
}

interface IFormMultipleSelectProps {
  label?: string;
  className?: string;
  name: string;
  placeholder?: string;
  options?: GroupedOption[] | IMultiSelectItem[];
}

const FormMultipleSelect: FC<IFormMultipleSelectProps> = (props) => {
  const { name = '', className, label, options = [], ...rest } = props;
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={clsx('w-full input-container', className)}>
      {label && <p className="text-gray-700 text-s mb-2">{label}</p>}
      <Select
        {...rest}
        {...field}
        className="[&>div]:border-0 [&>div]:shadow-s [&>div]:rounded-lg [&>div]:text-base [&>div]:text-gray-1000"
        options={options}
        isMulti
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => (
            <img className="pr-4" src="/assets/icons/chevron-down-icon.svg" alt="dropdown icon" />
          ),
        }}
      />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormMultipleSelect;
