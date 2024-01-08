'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/HOC/withAuth';
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('@/containers/projects'));

const ProjectsPage = () => {
  return <Projects />;
};

export default withAuth(ProjectsPage)([USER_TYPE.USER]);
