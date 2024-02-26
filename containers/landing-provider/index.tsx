'use client';

import NewLandingLayout from '@/components/NewLandingLayout';
import { FC, useRef } from 'react'; // Import useRef here
import AboutSection from './components/AboutSection';
import StepSection from './components/StepSection';
import TestimonialsSection from './components/TestimonialsSection';
import CalendarSection from './components/CalendarItem'; // Assuming CalendarItem is the correct import
import FeaturesSection from './components/FeaturesSection';
import CallToAction from './components/CallToAction';

// Removed INewLandingProps as it's not used in this example

const NewLanding: FC = () => { // Removed INewLandingProps for simplicity
  const calendarRef = useRef<HTMLDivElement>(null); // Correct useRef usage

  // Function to scroll to the CalendarSection
  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NewLandingLayout>
      {/* Pass scrollToCalendar to AboutSection */}
      <AboutSection onBookDemoClick={scrollToCalendar} />
      <StepSection />
      <CallToAction />
      <FeaturesSection />
      {/* Apply the ref to the CalendarSection or its wrapper */}
      <div ref={calendarRef}>
        <CalendarSection 
          title="Book Your Demo" 
          description="See how askIoT can drive leads in 15 mins."
        />
      </div>
      <TestimonialsSection />
    </NewLandingLayout>
  );
};

export default NewLanding;



