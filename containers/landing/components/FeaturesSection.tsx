import { FC } from 'react';
import Image from 'next/image';

interface IFeaturesSectionProps {}

const FEATURE_DATA = [
  {
    title: 'Unified IoT Database:',
    description:
      'Consolidate data from devices, platforms, and connectivity options in one central location.',
  },
  {
    title: 'AI-Driven Recommendations',
    description: `Query AskIoT about specific IoT requirements as if you're conversing with an expert colleague.`,
  },
  {
    title: 'Seamless Quotation Process',
    description:
      'Request and compare quotes from recommended vendors effortlessly, ensuring you get the best value and fit.',
  },
];

const FeaturesSection: FC<IFeaturesSectionProps> = (props) => {
  return (
    <section className="feature-section md:py-20 py-1 overflow-hidden">
      <div className="container">
        <div className="md:pt-[15px] pt-15">
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-7.5 gap-4">
            {FEATURE_DATA.map((item, index) => (
              <div key={index} className="flex py-5 px-3 rounded-xl shadow-xxs bg-white">
                <Image
                  className="w-[23px] h-[23px]"
                  src="/assets/logo/logo-outlined.svg"
                  width={23}
                  height={23}
                  alt="AskIot"
                />
                <div className="ml-2">
                  <p className="text-primary-900 text-xl md:text-2xl font-medium">{item.title}</p>
                  <p className="text-base md:text-l text-gray-1200 md:mt-4 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
