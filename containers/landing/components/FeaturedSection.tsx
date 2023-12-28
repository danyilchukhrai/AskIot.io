import { FC } from 'react';
import FeaturedItem from './FeaturedItem';
import Image from 'next/image';

interface IFeaturedSectionProps {}

const FeaturedSection: FC<IFeaturedSectionProps> = (props) => {
  return (
    <section className="featured-section py-25 md:py-[20px]">
      <div className="container">
        <FeaturedItem
          ImageComponent={
            <div className="relative w-full md:w-auto md:flex-1 md:ml-16  shadow rounded-xl md:mt-0 mt-8">
              <img
                className="w-full"
                src="/assets/images/featured-info-image.webp"
                width={950}
                height={580}
                alt="icon"
              />
            </div>
          }
          description={
            <>
              <span className="block">
                Navigating through the myriad of IoT devices,connectivity and platform options can be
                overwhelming. That’s where askIoT steps in.
              </span>
              <span className="block mt-4 md:mt-8">
                Chat with our IoT trained AI agent to quickly build your solution.
              </span>
            </>
          }
          title="Build your solution within minutes"
        />
        <div className="relative">
          <FeaturedItem
            className="md:pt-[200px] pt-18"
            contentClassName="md:w-[41%] w-full mt-8 md:mt-0"
            ImageComponent={
              <div className="relative w-full md:w-[48%] flex justify-end">
                <Image
                  className="h-auto w-full object-cover"
                  src="/assets/images/featured-products-image.webp"
                  width={536}
                  height={356}
                  alt="images"
                />
                <Image
                  className="absolute md:-right-[35px] md:bottom-[27px] md:translate-x-full bottom-0 right-0 -z-10 md:z-0"
                  src="/assets/logo/logo-gray-landing.svg"
                  width={66}
                  height={66}
                  alt="images"
                />
              </div>
            }
            description={`AskIoT understands your questions, guiding you through IoT options and connecting you with vendors. Replace manual searches with smart, conversational assistance.`}
            title="Let AI streamline your IoT exploration. No forms, just answers."
            reverse
          />
          <Image
            className="absolute left-[39px] top-[27px]"
            src="/assets/logo/logo-gray-landing.svg"
            width={66}
            height={66}
            alt="images"
          />
          <Image
            className="absolute md:right-[7px] md:top-[135px] top-1/2 right-1/2 translate-y-2/5 -z-10 md:z-0 md:translate-y-0"
            src="/assets/logo/logo-gray-landing.svg"
            width={66}
            height={66}
            alt="images"
          />
        </div>

        <FeaturedItem
          className="md:pt-[200px] pt-18"
          contentClassName="md:w-[39%] w-full"
          ImageComponent={
            <div className="relative md:flex-1 md:ml-16 ml-0 flex justify-end mt-8 md:mt-0">
              <Image
                className="h-auto w-full object-cover"
                src="/assets/images/featured-quote-image.svg"
                width={576}
                height={589}
                alt="images"
              />
            </div>
          }
          description={`Let askIoT's AI sift , categorizing them based on price,
              availability, and other essential features. No need to dive into each response -
              it's streamlined by askIoT.`}
          title="AI-optimized vendor selection, effortlessly."
        />
      </div>
    </section>
  );
};

export default FeaturedSection;
