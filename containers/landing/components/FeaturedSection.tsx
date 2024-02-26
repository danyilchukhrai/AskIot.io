import Image from 'next/image';
import { FC } from 'react';
import FeaturedItem from './FeaturedItem';

interface IFeaturedSectionProps {}

const FeaturedSection: FC<IFeaturedSectionProps> = (props) => {
  return (
    <section className="featured-section py-15 md:py-[100px]">
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
                Navigating through the myriad of IoT devices and connectivity options can be
                overwhelming. That’s where askIoT steps in.
              </span>
              <span className="block mt-4 md:mt-8">
                From device specifications to connectivity solutions, get a thorough understanding
                without the technical jargon. Whether it’s the automatic failover to Ethernet on the
                InRouter900 or comparing different IoT solutions, we’ve got you covered.
              </span>
            </>
          }
          title="Use Natural Language to understand product capabilities"
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
            description={`AskIoT comprehends all your free-text inquiries. The AI engages you in a dynamic, human-like conversation to understand your needs, whether it's exploring device options or requesting quotes and availability from vendors. Say goodbye to manual searches and hello to intuitive, AI-powered IoT procurement.`}
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
                src="/assets/images/featured-quote-image.webp"
                width={576}
                height={589}
                alt="images"
              />
            </div>
          }
          description={`Let askIoT's AI sift through vendor responses, categorizing them based on price, availability, and other essential features. With a simple request, the AI can even recommend the best vendor match for your criteria. Gain a clear perspective on vendor offerings without the hassle of manual comparisons, ensuring your choices are data-driven and tailored to your project needs. No need to dive into each response - it's streamlined by askIoT.`}
          title="Automatically Harness Vendor Responses."
        />
      </div>
    </section>
  );
};

export default FeaturedSection;
