'use client';
import PublicLayout from '@/components/PublicLayout';
import { FC } from 'react';
import AboutSection from './components/AboutSection';
import FeaturedSection from './components/FeaturedSection';
import JoinWaitlist from './components/JoinWaitlist';
import OrganizationsSection from './components/OrganizationsSection';
import TestimonialsSection from './components/TestimonialsSection';


interface ILandingProps {}

const Landing: FC<ILandingProps> = (props) => {
  return (
    <PublicLayout>
      <AboutSection />
      <OrganizationsSection />
      <FeaturedSection />
       <TestimonialsSection />
      <JoinWaitlist />
    </PublicLayout>
  );
};

export default Landing;
