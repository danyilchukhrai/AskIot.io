import '@yaireo/tagify/dist/tagify.css';
import clsx from 'clsx';
import { HTMLProps, forwardRef } from 'react';

export interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((props, ref) => {
  const { label = '', className, containerClassName, name = '', ...rest } = props;

  return (
    <div className={clsx('flex flex-col textarea', containerClassName)}>
      {label && <p className="text-gray-700 text-s mb-2">{label}</p>}
      <textarea
        {...rest}
        name={name}
        ref={ref}
        className={clsx(
          'rounded-lg px-3 py-2.5 shadow-s text-gray-1000 text-base resize-none',
          className,
        )}
        autoFocus
      ></textarea>
    </div>
  );
});

export default Textarea;
