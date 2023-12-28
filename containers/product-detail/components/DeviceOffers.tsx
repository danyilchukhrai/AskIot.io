import { CustomImg } from '@/components/CustomImage';
import { generateSpecificationIconPath } from '@/helpers/common';
import { ISpecification } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import { FC, HTMLProps } from 'react';

interface IDeviceOffersProps extends HTMLProps<HTMLUListElement> {
  specifications?: ISpecification[];
}

const DeviceOffers: FC<IDeviceOffersProps> = (props) => {
  const { specifications = [] } = props;
  return (
    <ul {...props} className={clsx('devices overflow-auto h-full', props.className)}>
      {specifications?.map((it, index) => (
        <li
          key={index}
          className="flex items-center gap-2 px-3 first:border-t border-b border-x border-gray-100"
        >
          <div className="flex items-center flex-1 py-3">
            <CustomImg className="w-5 h-5" src={generateSpecificationIconPath(it?.icon)} />
            <span className="ml-5 text-base text-gray-1000 break-words">{it.name}</span>
          </div>
          <p className="flex-1 text-base text-gray-1000 pl-3 py-3 border-l border-gray-100 break-words">
            {it.value}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default DeviceOffers;
