import * as React from 'react';

interface IIndustriesFeaturesModalProps {
  list: string[];
}

const IndustriesFeaturesModal: React.FunctionComponent<IIndustriesFeaturesModalProps> = ({
  list,
}) => {
  return (
    <div className="shadow w-full rounded-lg bg-white md:bg-transparent max-w-[400px]">
      {list.map((it, index) => (
        <div
          key={index}
          className="text-gray-1000 md:text-base text-s font-medium shadow first:rounded-t-lg flex items-center justify-between p-4 last:rounded-b-lg"
        >
          <p>{it}</p>
        </div>
      ))}
    </div>
  );
};

export default IndustriesFeaturesModal;
