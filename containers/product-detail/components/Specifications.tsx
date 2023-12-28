import Button from '@/components/Button';
import { CustomImg } from '@/components/CustomImage';
import { generateSpecificationIconPath } from '@/helpers/common';
import { ISpecification } from '@/modules/iot-gpt/type';
import * as React from 'react';

interface ISpecificationsProps {
  specifications: ISpecification[];
  onSeeAll: () => void;
}

const ITEM_PER_PAGE = 5;

const Specifications: React.FunctionComponent<ISpecificationsProps> = ({
  specifications,
  onSeeAll,
}) => {
  const filteredList = specifications.slice(0, ITEM_PER_PAGE);

  return (
    <div className="mt-6 md:mt-5 p-0 md:p-6 md:rounded-xl md:shadow flex flex-wrap">
      <div className="w-full md:w-[32%] mr-6 mb-6 md:mb-0">
        <p className="text-gray-1000 text-l font-medium">Specifications</p>
        <p className="text-gray-500 text-s mt-0.5">Specifications here</p>
      </div>
      <div className="flex-1 rounded-lg ">
        <div className="shadow w-full rounded-lg bg-white md:bg-transparent">
          {filteredList.map((it, index) => (
            <div
              key={index}
              className="text-gray-1000 md:text-base text-s font-medium shadow first:rounded-t-lg flex items-center justify-between p-4 last:rounded-b-lg gap-2"
            >
              <p className="flex items-center">
                <CustomImg className="w-5 h-5 mr-2" src={generateSpecificationIconPath(it?.icon)} />
                <span>{it.name}</span>
              </p>
              <p>{it.value}</p>
            </div>
          ))}
        </div>
        {filteredList?.length < specifications?.length && (
          <Button className="mt-6" variant="secondary" onClick={onSeeAll}>
            {`See all ${specifications?.length} features`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Specifications;
