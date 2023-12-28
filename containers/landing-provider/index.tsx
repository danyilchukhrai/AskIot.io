import NewLandingLayout from '@/components/NewLandingLayout';
import { FC } from 'react';
import AboutSection from './components/AboutSection';
import StepSection from './components/StepSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesSection from './components/FeaturesSection';

interface INewLandingProps {}

const NewLanding: FC<INewLandingProps> = (props) => {
  return (
    <NewLandingLayout>
      <AboutSection />
      <StepSection />
      <FeaturesSection />
      <TestimonialsSection />
    </NewLandingLayout>
  );
};

export default NewLanding;
