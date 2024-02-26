import Badge from '@/components/Badge';
import Button from '@/components/Button';
import clsx from 'clsx';
import { FC } from 'react';

export interface IPlanItem {
  title: string;
  price: string;
  includes: string[];
  button: string;
  name: string;
}

export interface IPlanItemProps extends IPlanItem {
  className?: string;
  onSelect?: (planName: string, planTitle: string) => void;
  isMostPopular?: boolean;
}

const PlanItem: FC<IPlanItemProps> = ({
  title,
  price,
  includes,
  button,
  className,
  isMostPopular = false,
  name,
  onSelect,
}) => {
  return (
    <div
      className={clsx(
        'p-6 rounded-xl border relative pt-8',
        className,
        isMostPopular ? 'border-primary-500' : 'border-gray-200',
      )}
    >
      {isMostPopular && (
        <Badge
          className="absolute top-2 right-2 bg-primary-500 text-white"
          label="Most Popular"
          size="small"
          color="blue"
        />
      )}
      <p className="text-gray-1000 font-medium text-l">{title}</p>
      <p className="text-2xl font-semibold py-6" dangerouslySetInnerHTML={{ __html: price }} />
      <Button
        className={clsx(' w-full', {
          '!text-primary-500 bg-white border border-primary-500': !isMostPopular,
        })}
        variant="info"
        onClick={() => onSelect && onSelect(name, title)}
      >
        {button}
      </Button>
      <div className="h-[1px] bg-gray-200 my-4" />
      <div>
        <p className="text-gray-600 text-base pb-3">Includes:</p>
        <ul className="includes flex flex-col gap-3">
          {includes.map((it, index) => (
            <li className="flex items-center gap-2 text-base" key={index}>
              <img src="/assets/icons/check-icon.svg" alt="icon check" />
              <p className="text-gray-1000">{it}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanItem;
