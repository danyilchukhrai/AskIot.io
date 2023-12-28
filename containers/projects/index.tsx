import { FC } from 'react';
import ProjectList from './components/ProjectList';

interface IProjectsProps {}

const Projects: FC<IProjectsProps> = (props) => {
  return (
    <div className="p-8">
      <p className="text-gray-1000 text-xl">Projects</p>
      <ProjectList className="mt-9.5" />
    </div>
  );
};

export default Projects;
