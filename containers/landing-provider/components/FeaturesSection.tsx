import { FC } from 'react';
import FeatureItem from './FeatureItem';
import Image from 'next/image';

interface IFeaturesSectionProps {}

const FeaturesSection: FC<IFeaturesSectionProps> = (props) => {
  return (
    <section className="feature-section md:py-20 py-10 overflow-hidden">
      <div className="container">
        <div className="relative">
          <FeatureItem
            title="Increased Visibility"
            description="Showcase your offerings on the first AI driven IoT marketplace"
            child={[
              'Top-tier exposure with high-intent users.',
              'Brand amplification across your products.',
              'Tailored placement to help win more leads.',
            ]}
            imgSrc="/assets/images/new-feature-1.webp"
            contentClassName="md:pl-[59px] md:pr-[43px]"
          />
          <Image
            className="w-[110px] h-[110px] absolute -top-[25px] left-0 -translate-x-full"
            src="/assets/logo/logo-new-landing.svg"
            width={110}
            height={110}
            alt="AskIoT"
          />
          <div className="w-[241px] h-[241px] rounded-full bg-primary-500 opacity-10 blur-[198px] absolute -top-[143px] -right-[184px]" />
        </div>

        <div className="md:py-30 py-15 relative">
          <FeatureItem
            title="Engage with Customers"
            description="Connect directly with businesses actively seeking your solutions."
            child={[
              'Drive meaningful engagements with potential clients',
              'Instant feedback loop.',
              'Address inquiries in real time. Speed wins deals.',
            
            ]}
            imgSrc="/assets/images/new-feature-2.webp"
            contentClassName="md:pl-[35px] md:pr-[67px]"
            reverse
          />
          <Image
            className="w-[140px] h-[140px] absolute -top-[9px] right-0"
            src="/assets/logo/logo-new-landing.svg"
            width={140}
            height={140}
            alt="AskIoT"
          />
          <Image
            className="w-[140px] h-[140px] absolute bottom-[37px] -left-[89px]"
            src="/assets/logo/logo-new-landing.svg"
            width={140}
            height={140}
            alt="AskIoT"
          />
          <div className="w-[241px] h-[241px] rounded-full bg-primary-500 opacity-10 blur-[198px] absolute top-0 -left-[206px]" />
        </div>
        <div className="relative">
          <FeatureItem
            title="Maximize Revenue"
            description="Grow your business with targeted leads"
            child={[
              'Quality Over Quantity',
              'Simplify transactions across prospects.',
              'Focus on high-conversion opportunities',
            ]}
            imgSrc="/assets/images/new-feature-3.jpg"
            contentClassName="md:pl-[59px] md:pr-[43px]"
          />
          <Image
            className="w-[140px] h-[140px] absolute -bottom-[13px] -right-[27px]"
            src="/assets/logo/logo-new-landing.svg"
            width={140}
            height={140}
            alt="AskIoT"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
