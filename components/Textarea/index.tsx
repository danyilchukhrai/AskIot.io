import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import clsx from 'clsx';
import { HTMLProps, forwardRef, useEffect } from 'react';

export interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  isShowTags?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((props, ref) => {
  const {
    label = '',
    className,
    containerClassName,
    isShowTags = false,
    name = '',
    ...rest
  } = props;

  useEffect(() => {
    if (!isShowTags) return;
    const element: any = document?.querySelector(`textarea[name=${name}]`);

    if (element && isShowTags) {
      new Tagify(element);
    }
  }, [isShowTags]);

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
