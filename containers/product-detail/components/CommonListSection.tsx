import Button from '@/components/Button';
import * as React from 'react';

interface ICommonListSectionProps {
  list: string[];
  onSeeAll?: () => void;
  title: string;
  desc: string;
}

const FEATURES_PER_PAGE = 5;

const CommonListSection: React.FunctionComponent<ICommonListSectionProps> = ({
  list,
  onSeeAll,
  title,
  desc,
}) => {
  const [filteredList, setFilteredList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (list) {
      setFilteredList(list.slice(0, FEATURES_PER_PAGE));
    }
  }, [list]);

  return (
    <div className="mt-6 md:mt-5 p-0 md:p-6 md:rounded-xl md:shadow flex flex-wrap">
      <div className="w-full md:w-[32%] mr-6 mb-6 md:mb-0">
        <p className="text-gray-1000 text-l font-medium">{title}</p>
        <p className="text-gray-500 text-s mt-0.5">{desc}</p>
      </div>
      <div className="flex-1 rounded-lg ">
        <div className="shadow w-full rounded-lg bg-white md:bg-transparent">
          {filteredList.map((it, index) => (
            <div
              key={index}
              className="text-gray-1000 md:text-base text-s font-medium shadow first:rounded-t-lg flex items-center justify-between p-4 last:rounded-b-lg"
            >
              <p>{it}</p>
            </div>
          ))}
        </div>
        {filteredList?.length > list?.length && (
          <Button className="mt-6" variant="secondary">
            Show less
          </Button>
        )}{' '}
        {filteredList?.length < list?.length && list?.length && (
          <Button className="mt-6" variant="secondary" onClick={onSeeAll}>
            {`See all ${list?.length} features`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommonListSection;
