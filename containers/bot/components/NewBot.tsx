import Stepper from '@/components/Steppter';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CreateBot from './CreateBot';
import TrainBot from './TrainBot';
import Customize from './Customize';
import GoLive from './GoLive';

interface INewBotProps { }

export enum BOT_CREATE_STEPS {
  BOT_CREATE,
  TRAIN_BOT,
  CUSTOMIZE,
  GO_LIVE
}

const steps = [
  {
    label: 'Create a Bot',
    step: BOT_CREATE_STEPS.BOT_CREATE,
  },
  {
    label: 'Train the Bot',
    step: BOT_CREATE_STEPS.TRAIN_BOT,
  },
  {
    label: 'Customize',
    step: BOT_CREATE_STEPS.CUSTOMIZE,
  },
  {
    label: 'Go Live',
    step: BOT_CREATE_STEPS.GO_LIVE,
  },
];

const NewBot: FC<INewBotProps> = (props) => {
  const [active, setActive] = useState(BOT_CREATE_STEPS.BOT_CREATE);
  const botForm = useForm({
    defaultValues: {
      botName: '',
      accessToken: '',
      step: BOT_CREATE_STEPS.BOT_CREATE,
    },
  });

  const handleNextStep = () => {
    setActive((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setActive((prev) => prev - 1);
  };

  useEffect(() => {
    botForm.setValue('step', active);
  }, [active]); //eslint-disable-line


  const renderSteps = () => {
    switch (active) {
      case BOT_CREATE_STEPS.BOT_CREATE:
        return <CreateBot onNextStep={handleNextStep} />;
      case BOT_CREATE_STEPS.TRAIN_BOT:
        return <TrainBot onNextStep={handleNextStep} onBackStep={handleBackStep} />;
      case BOT_CREATE_STEPS.CUSTOMIZE:
        return (
          <Customize onNextStep={handleNextStep} onBackStep={handleBackStep} />
        );
      case BOT_CREATE_STEPS.GO_LIVE:
        return (
          <GoLive onBackStep={handleBackStep} />
        );
    }
  };

  return (
    <>
      <FormProvider {...botForm}>
        <section
          className='vendor-onboarding-section relative min-h-screen p-8 flex justify-center items-center'
        >
          {(active !== BOT_CREATE_STEPS.CUSTOMIZE && active !== BOT_CREATE_STEPS.TRAIN_BOT )? (
            <div className="md:w-[795px] w-full md:py-12 md:px-9 py-8 px-6 rounded-xl border border-gray-500">
              <Stepper active={active} steps={steps} />
              {renderSteps()}
            </div>
          ) : (
            <div className="md:w-[965px] w-full md:py-12 md:px-9 py-8 px-6 rounded-xl border border-gray-500">
              <Stepper active={active} steps={steps} />
              {renderSteps()}
            </div>
          )}
        </section>
      </FormProvider>
    </>
  );
};

export default NewBot;
