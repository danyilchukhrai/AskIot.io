import clsx from 'clsx';
import { HTMLProps, forwardRef } from 'react';

interface ICheckboxProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
  const { inputClassName, label, id } = props;
  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        {...props}
        className={clsx('checkbox-input', inputClassName)}
        type="checkbox"
      />
      {label && (
        <label
          className="text-s text-gray-700 hover:cursor-pointer"
          htmlFor={id}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}
    </div>
  );
});

export default Checkbox;
