import clsx from 'clsx';
import { FC } from 'react';

interface IStepperProps {
  steps: { label: string; step: number }[];
  active: number;
}

const Stepper: FC<IStepperProps> = ({ steps, active }) => {
  return (
    <div className="steppers flex items-center">
      {steps.map((item, index, arr) => {
        const isActiveStep = active >= item.step;
        const isLastStep = index === arr.length - 1;

        return (
          <div
            className={clsx('step flex flex-col items-center relative  w-full self-start')}
            key={index}
          >
            <div className="w-full flex items-center justify-center relative">
              <img
                className="md:w-8 md:h-8 w-6 h-6 block max-w-none bg-white"
                src={
                  isActiveStep ? '/assets/icons/active-step.svg' : '/assets/icons/inactive-step.svg'
                }
                alt="active step icon"
              />
              {!isLastStep && (
                <div
                  className={clsx(
                    'absolute h-0.5 left-1/2 -z-10 w-full',
                    isActiveStep ? 'bg-primary-500' : 'bg-gray-100',
                  )}
                />
              )}
            </div>
            <p
              className={clsx(
                'text-s md:text-base mt-2.5 text-center',
                isActiveStep ? 'text-gray-1000' : 'text-gray-500',
              )}
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
