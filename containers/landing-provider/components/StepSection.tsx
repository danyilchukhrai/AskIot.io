import Image from 'next/image';
import { FC } from 'react';

interface IStepSectionProps {}

const STEP_DATA = [
  {
    title: 'Verify Your Profile',
    description: `Join askIoT and optimize your pre-filled product profile.`,
    image: '/assets/images/step-1.webp',
  },
  {
    title: 'Get Quality Leads',
    description: `Access curated leads tailored to your offerings daily.`,
    image: '/assets/images/step-2.webp',
  },
  {
    title: 'Engage & Quote',
    description: `Swiftly address inquiries and present your best quotes.`,
    image: '/assets/images/step-3.webp',
  },
];

const StepSection: FC<IStepSectionProps> = (props) => {
  return (
    <section className="step-section md:py-20 py-10 rounded-[48px] bg-white relative">
      <div className="container">
        <ul className="steps grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {STEP_DATA.map((item, index) => (
            <li className="md:max-w-[370px]" key={index}>
              <div className="flex flex-col items-center">
                <Image
                  className="h-[172px] w-auto"
                  src={item.image}
                  width={201}
                  height={172}
                  alt={`step-${index + 1}`}
                />
                <p className="text-primary-800 text-xl font-medium text-center md:pt-8 md:pb-5 pt-3 pb-2">
                  Step {index + 1}
                </p>
                <p className="text-gray-700 text-[1.625rem] leading-[44px] font-semibold md:pb-6 pb-2 text-center">
                  {item.title}
                </p>
                <p className="text-gray-600 text-center text-l">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StepSection;
