import Button from '@/components/Button';
import { CustomNextImage } from '@/components/CustomImage';
import FormInput from '@/components/FormComponents/FormInput';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { createBot } from '@/modules/bots/services';

interface ICreateBotProps {
  onNextStep: () => void;
}

const CreateBot: FC<ICreateBotProps> = ({ onNextStep }) => {
  const form = useFormContext();
  const [name, setName] = useState<string>("");

  return (
    <>
      <div className="md:mt-[48px] mt-12 flex flex-col items-center">
        <div className="md:max-w-[528px] max-w-[100%] flex flex-col items-center mx-auto">
          <p className="text-gray-1000 text-l text-center mb-5">
            Create a Bot
          </p>
          <p className='text-495057 text-13 font-inter text-xs font-normal leading-4 mb-2 w-full'>Bot Name</p>
          <FormInput
            name="vendorname"
            className="md:w-[343px] w-full mb-5"
            placeholder="Please input the Bot name."
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>

        <Button onClick={async () => {
          if (name !== '') {
            await createBot(name);
            onNextStep();
          }
        }}>Next</Button>
      </div>
    </>
  );
};

export default CreateBot;
