import clsx from 'clsx';
import * as React from 'react';

interface ITooltipProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  textClassName?: string;
}

const Tooltip: React.FunctionComponent<ITooltipProps> = ({
  children,
  text,
  className,
  textClassName = '',
  ...rest
}) => {
  return (
    <div {...rest} className={clsx('tooltip max-w-full', className)}>
      {children}
      <span className={clsx('tooltip-text text-l', textClassName)}>{text}</span>
    </div>
  );
};

export default Tooltip;
