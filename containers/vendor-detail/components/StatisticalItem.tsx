import { FC } from 'react';
import clsx from 'clsx';

interface IStatisticalItemProps {
  label: string;
  value: string | number;
  subValue?: string | number;
  isLastEl?: boolean;
}

const StatisticalItem: FC<IStatisticalItemProps> = ({
  label,
  value,
  subValue,
  isLastEl = false,
}) => {
  return (
    <div
      className={clsx('md:px-6 md:py-4 px-3 py-2 ', {
        'border-r border-gray-100': !isLastEl,
      })}
    >
      <p className="text-gray-600 text-s">{label}</p>
      <p className="text-primary-500 text-base font-medium flex items-center mt-2">
        <span>{value} </span>
        {!!subValue && <span className="text-xs ml-1">{' ' + subValue}</span>}
      </p>
    </div>
  );
};

export default StatisticalItem;
