import Button from '@/components/Button';
import clsx from 'clsx';
import { FC } from 'react';

interface IPlanItemProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  limits?: string[];
  isFreePlan?: boolean;
  onStayOnFree?: () => void;
  onGoUnlimited?: () => void;
  className?: string;
}

const PlanItem: FC<IPlanItemProps> = ({
  title,
  description,
  price,
  features,
  limits = [],
  isFreePlan,
  onStayOnFree,
  onGoUnlimited,
  className = '',
}) => {
  return (
    <div className={clsx('plan-item p-6 flex flex-col', className)}>
      <div className="relative">
        <p className="title text-3xl font-medium">{title}</p>
        <p
          className="desc text-l font-medium mt-2 text-gray-1000"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <p className="text-3xl font-semibold mt-4">{`$${price}`}</p>
      </div>
      <ul className="features mt-8 flex flex-col gap-3">
        {features.map((it, index) => (
          <li className="flex items-center gap-3" key={index}>
            <img src="/assets/icons/check-icon.svg" alt="icon check" />
            <p className="text-l text-gray-1000">{it}</p>
          </li>
        ))}
      </ul>
      <ul className="limits flex flex-col gap-3 mt-3">
        {limits.map((it, index) => (
          <li className="flex items-center gap-3" key={index}>
            <img src="/assets/icons/x-mark-danger.svg" alt="x mark danger" />
            <p className="text-l text-gray-1000">{it}</p>
          </li>
        ))}
      </ul>
      <div className="footer flex-1 mt-5 flex justify-center items-end">
        <Button variant="info" onClick={isFreePlan ? onStayOnFree : onGoUnlimited}>
          {isFreePlan ? 'Stay on Free' : 'Go Unlimited'}
        </Button>
      </div>
    </div>
  );
};

export default PlanItem;
