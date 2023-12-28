
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';

interface IStepBarProps {
  step: number;
}

const StepBar: FC<IStepBarProps> = (props) => {

  return (
    <>
      <section className="stepbar-section">
        {/* <div className="first-letter:md:pt-0 pt-0 flex justify-between">
        <img src="/assets/images/enable-line.png" className="w-54.5 h-8" />
        <img src={props.step === 0 ? "/assets/images/disable-line.png" : "/assets/images/enable-line.png"} className="w-54.5 h-8" />
        <img src={props.step > 1 ? "/assets/images/enable-point.png" : "/assets/images/disable-point.png"} className="w-8 h-8" />
        <img src={props.step > 2 ? "/assets/images/go-live-enable.png" : "/assets/images/go-live-disable.png"} className="w-54.5 h-8" />
      </div>
      <div className='flex w-full justify-center items-center content-center gap-y-10 gap-x-34 flex-wrap'>
        <p className='text-gray-900 font-inter text-base font-normal leading-5'>Create a Bot</p>
        <p className='text-gray-900 font-inter text-base font-normal leading-5'>Train the Bot</p>
        <p className='text-gray-900 font-inter text-base font-normal leading-5'>Customize</p>
        <p className='text-gray-900 font-inter text-base font-normal leading-5'>Go Live</p>
      </div> */}
        <div className="first-letter:md:pt-0 pt-0 flex justify-between">
          <div>
            <img src={"/assets/images/enable-point.png"} className="w-8 h-8" />

          </div>
        </div>
      </section>
    </>
  );
};

export default StepBar;
