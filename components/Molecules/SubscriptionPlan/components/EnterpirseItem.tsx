import Button from '@/components/Button';
import clsx from 'clsx';
import { FC } from 'react';
import { IPlanItemProps } from './PlanItem';

interface IEnterpriseItemProps extends IPlanItemProps {}

const EnterpriseItem: FC<IEnterpriseItemProps> = ({
  title,
  price,
  isMostPopular,
  button,
  includes,
  name,
  onSelect,
}) => {
  return (
    <div className="border border-gray-300 rounded-xl p-6 shadow-lg transition-all hover:shadow-2xl bg-f8f8fa flex flex-col justify-between"> 
      <div className="plan-info mb-6">
        <h2 className="text-primary-500 font-bold text-xl mb-2">{title}</h2>
        <p className="text-4xl font-bold text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: price }} />
        

      </div>
      <div className="includes">
        <p className="text-gray-600 font-medium mb-3">Includes:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          {includes.map((item, index) => (
            <li className="flex items-center gap-2" key={index}>
              <img src="/assets/icons/check-icon.svg" alt="Check icon" className="h-5 w-5 fill-current text-primary-500" />
              <p className="text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
        <div className="text-center mt-4"> 
          <Button
            className="inline-block px-50 py-3 text-lg font-semibold rounded-lg transition-colors text-white bg-[#2b64f7] hover:bg-[#1a53c5] max-w-s" 
            onClick={() => onSelect && onSelect(name, title)}
          >
            {button}
          </Button>
        
      </div>
    </div>
  );
};

export default EnterpriseItem;
