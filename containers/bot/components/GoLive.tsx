import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IGoLiveProps {
}

const GoLive: FC<IGoLiveProps> = () => {
  const form = useFormContext();
  const [name, setName] = useState<string>("");

  return (
    <>
      <div className="md:mt-[48px] mt-12 flex flex-col items-center">
        <div className="md:max-w-[669px] max-w-[100%] flex flex-col gap-5 items-center mx-auto">
          <p className="text-gray-1000 text-l text-center">
            Embed chatbot
          </p>
          <div className="flex w-full flex-col gap-5 py-[20px] px-[10px] items-start rounded-[8px] border border-solid border-green-200 bg-green-100">
            <p className="text-[#37B24D] font-inter text-[13px] font-normal leading-[16px]">
              Your chatbot is ready now
            </p>
            <p className="text-[#37B24D] font-inter text-[13px] font-normal leading-[16px]">
              Your chatbot is published now and ready to be shared with the world! Copy this link to share your chatbot
              on social media, messaging app or via email.
            </p>
            <p className="text-[#000] font-inter text-[13px] font-normal leading-[16px] cursor-pointer">
              Try Demo
            </p>
          </div>

          <div className='section-embeded w-full'>
            <p className='text-[#000] text-[16px] font-inter font-normal leading-6 w-full'>Embed your chatbot on website</p>
            <p className='text-[#ADB5BD] text-[14px] font-inter font-normal leading-6 mb-[6px] w-full'>Embed your chatbot on website</p>
            <div className='mt-[11px] flex'>
              <FormInput
                name="vendorname"
                className="md:w-[343px] w-full"
                placeholder="Please input the Bot name."
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
              <div className="flex py-[10px] px-[12px] justify-center items-center rounded-[8px] bg-blue-600 shadow-box cursor-pointer ml-[12px]">
                <p className="text-[#F8F9FA] font-inter text-[14px] leading-[20px]">
                  Copy
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={() => { }} className='mt-5'>Finish</Button>
      </div>
    </>
  );
};

export default GoLive;
