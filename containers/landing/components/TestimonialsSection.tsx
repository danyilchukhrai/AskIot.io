'use client';
import Avatar from '@/components/Avatar';
import Image from 'next/image';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

interface ITestimonialsSectionProps {}

const REVIEWS = [
  {
    content: `Eagerly awaiting askIoT's launch. It promises to redefine our customer interactions in the IoT space. This is the game-changer we've been waiting for.`,
    name: 'Landon Garner',
    position: 'Chief Marketing Officer, Kajeet',
    image: '/assets/images/reviewer-lg.png'
  },
  {
    content: `As askIoT prepares to launch, we're excited for enterprises to discover the depth of Queclink's offerings. This platform promises to be a win-win, setting the stage for greater collaborations and amplified impact.`,
    name: 'Manny Hernandez',
    position: 'Vice President of North America, Queclink Wireless Solutions Co Ltd',
    image: '/assets/images/reviewer-mg.png'
  },
];

const CustomNextButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute top-1/2 right-0 -translate-y-1/2 z-10 hover:cursor-pointer md:p-4 p-2 rounded-full border border-neutral-300"
    onClick={onClick}
  >
    <img className="w-6 h-6 rotate-180" src="/assets/icons/essential-icon.svg" />
  </div>
);

const CustomPreviousButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hover:cursor-pointer md:p-4 p-2 rounded-full border border-neutral-300"
    onClick={onClick}
  >
    <img className="w-4 h-6" src="/assets/icons/essential-icon.svg" />
  </div>
);

const TestimonialsSection: FC<ITestimonialsSectionProps> = (props) => {
  return (
    <section className="testimonials-section relative md:rounded-[48px] rounded-[24px] bg-white md:py-20 py-10">
      <div className="container">
        <p className="text-primary-500 text-2xl font-medium text-center">Testimonials</p>
        <p className="mt-5 text-gray-1200 text-4xl md:text-[2.5rem] md:leading-[56px] font-bold text-center">
          What Providers Say
        </p>
        <div className="md:pt-12 pt-6">
          <Carousel
            renderArrowNext={(clickHandler) => <CustomNextButton onClick={clickHandler} />}
            renderArrowPrev={(clickHandler) => <CustomPreviousButton onClick={clickHandler} />}
            showStatus={false}
            showIndicators={false}
          >
            {REVIEWS.map((item, index) => (
              <div className="max-w-[992px] mx-auto" key={index}>
                <div className="w-full flex flex-col items-center">
                  <Image
                    className="md:w-8 md:h-6.5 w-6 h-4.5"
                    src="/assets/icons/quote-mark-icon.svg"
                    width={32}
                    height={26}
                    alt="quote"
                  />
                  <p className="text-xl md:text-3xl text-black-100 font-medium text-center md:my-6 my-3">
                    {item.content}
                  </p>
                  <Image
                    className="md:w-8 md:h-6.5 w-6 h-4.5 rotate-180"
                    src="/assets/icons/quote-mark-icon.svg"
                    width={32}
                    height={26}
                    alt="quote"
                  />
                </div>
                <div className="w-8 h-0.5 bg-neutral-200 mx-auto my-5" />
                <div className="user-info">
                  <Avatar
                    className="!w-20 h-20"
                    rounded
                    src={item.image}
                    width={80}
                    height={80}
                  />
                  <p className="text-gray-1200 text-[2rem] font-bold text-center mt-4.5 mb-4">
                    {item.name}
                  </p>
                  <p className="text-2xl text-blueGray-700 text-center">{item.position}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
