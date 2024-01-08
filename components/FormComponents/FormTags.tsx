import Tags from '@yaireo/tagify/dist/react.tagify';
import clsx from 'clsx';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IFormTagsProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
}

const FormTags: FC<IFormTagsProps> = ({ className, label, name, placeholder }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: any) => {
    onChange(e?.detail?.value);
  };

  return (
    <div className={clsx('w-full input-container', className)}>
      {label && <p className="text-gray-700 text-s mb-2">{label}</p>}
      <Tags
        {...inputProps}
        className="rounded-lg px-3 py-2.5 shadow-s text-gray-1000 text-base resize-none min-h-[80px] w-full"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {invalid && <p className="text-red-500 text-s mt-2 error-msg">{error?.message}</p>}
    </div>
  );
};

export default FormTags;
