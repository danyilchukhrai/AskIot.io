import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingIndicator from '@/components/LoadingIndicator';
import Spinner from '@/components/Spinner';
import { handleShowError } from '@/helpers/common';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import {
  useAddProductToProject,
  useCreateNewProject,
  useGetAllProjectsByUser,
} from '@/modules/projects/hooks';
import { IProjectItem } from '@/modules/projects/types';
import { useAuthContext } from '@/providers/AuthProvider';
import clsx from 'clsx';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface ISaveFormProps {
  product?: IRecommendationInfo;
  onClose: () => void;
}

const SaveForm: FC<ISaveFormProps> = ({ product, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<IProjectItem>();
  const [inputProject, setInputProject] = useState('');
  const { user } = useAuthContext();
  const {
    data: projects = [],
    isLoading: isFetchingProjects,
    refetch: refetchProjects,
  } = useGetAllProjectsByUser();
  const { mutate: createNewProject, isPending: creatingProject } = useCreateNewProject();
  const { mutate: addProductToProject, isPending: addingProduct } = useAddProductToProject();
  const isCreateMode = !selectedProject || inputProject;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreateMode) {
      handleCreateNewProject();
    } else {
      handleAddProductToProject();
    }
  };

  const handleCreateNewProject = () => {
    createNewProject(
      {
        userId: user?.id || '',
        name: inputProject,
      },
      {
        onError: handleShowError,
        onSuccess: () => {
          setInputProject('');
          refetchProjects();
        },
      },
    );
  };

  const handleAddProductToProject = () => {
    addProductToProject(
      {
        projectId: selectedProject?.project_id || '',
        data: {
          productId: product?.id || product?.product_id || '',
          type: product?.type || product?.recommendationType || '',
        },
      },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          onClose();
        },
        onError: handleShowError,
      },
    );
  };

  return (
    <div>
      <div className="project-list pb-10 border-b border-gray-300">
        {projects?.length ? (
          <div>
            <p className="text-s text-gray-700">Add to project</p>
            <ul className="flex flex-wrap gap-4 md:gap-4.5 mt-4">
              {projects?.map((it, index) => (
                <li
                  className={clsx(
                    'p-3 rounded-xl border border-gray-300 text-base text-gray-1000 w-full md:w-[140px] text-center cursor-pointer flex items-center justify-center',
                    {
                      'bg-primary-500 text-white': selectedProject?.project_id === it?.project_id,
                    },
                  )}
                  key={index}
                  onClick={() => setSelectedProject(it)}
                >
                  {it.name}
                </li>
              ))}
            </ul>
          </div>
        ) : isFetchingProjects ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <p className="text-base text-gray-1000 px-3 py-2.5">No projects found</p>
        )}
      </div>
      <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
        <Input
          label="Create Project"
          value={inputProject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputProject(e.target.value)}
        />
        <Button
          className="md:self-end mt-8"
          type="submit"
          disabled={creatingProject || (!inputProject && !selectedProject)}
        >
          {!selectedProject || inputProject ? 'Create' : 'Save'}
        </Button>
      </form>
      {(creatingProject || addingProduct) && <LoadingIndicator />}
    </div>
  );
};

export default SaveForm;
