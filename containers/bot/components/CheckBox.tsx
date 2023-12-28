import { IVendorDetails } from '@/modules/vendors/type';
import { FC } from 'react';

interface ICheckBoxProps {
  content: string;
  value: boolean;
  setValue: any;
}

const CheckBox: FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  return (
    <>
      <div className="flex items-center gap-7">
        <div className="w-10 h-10 bg-blue-500 rounded-md">
        </div>
        <p className="text-black font-inter text-base font-normal leading-6">www.somelinkforsomething.com</p>
      </div>
    </>
  );
};

export default CheckBox;
