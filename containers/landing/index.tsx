'use client';
import PublicLayout from '@/components/PublicLayout';
import { FC } from 'react';
import AboutSection from './components/AboutSection';
import OrganizationsSection from './components/OrganizationsSection';
import FeaturedSection from './components/FeaturedSection';
import JoinWaitlist from './components/JoinWaitlist';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesSection from './components/FeaturesSection';

interface ILandingProps {}

const Landing: FC<ILandingProps> = (props) => {
  return (
    <PublicLayout>
      <AboutSection />
      <OrganizationsSection />
      <FeaturedSection />
      <FeaturesSection />
      <TestimonialsSection />
      <JoinWaitlist />
      <iframe src="http://localhost:3000"/>
    </PublicLayout>
  );
};

export default Landing;
