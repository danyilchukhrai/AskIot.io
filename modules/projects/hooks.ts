import { PROJECTS_API } from '@/constants/api-endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProductToProject,
  checkProductSaved,
  createNewProject,
  getAllProjects,
  getAllProjectsByUser,
  getAllSavedProducts,
  removeProductFromProject,
} from './services';
import { IAddProductToProjectBody, IRemoveProductFormProjectParams } from './types';

export const useGetAllProjectsByUser = () => {
  return useQuery({
    queryKey: [PROJECTS_API.getAllProjectsByUser.api],
    queryFn: getAllProjectsByUser,
  });
};

export const useCreateNewProject = () => {
  return useMutation({
    mutationFn: createNewProject,
  });
};

export const useAddProductToProject = () => {
  const queryClient = useQueryClient();
  const mutationFn = async ({
    projectId,
    data,
  }: {
    projectId: string | number;
    data: IAddProductToProjectBody;
  }) => {
    const resp = await addProductToProject({
      projectId,
      data,
    });
    await queryClient.invalidateQueries({
      queryKey: [PROJECTS_API.getAllSavedProducts.api],
    });

    return resp;
  };
  return useMutation({
    mutationFn,
  });
};

export const useCheckProductSaved = (productId: string | number) => {
  return useQuery({
    queryKey: [PROJECTS_API.checkProductSaved.api(productId), productId],
    queryFn: () => checkProductSaved(productId),
    enabled: !!productId,
  });
};

export const useGetAllSavedProducts = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [PROJECTS_API.getAllSavedProducts.api],
    queryFn: getAllSavedProducts,
    enabled,
  });
};

export const useRemoveProductFormProject = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (params: IRemoveProductFormProjectParams) => {
    const resp = await removeProductFromProject(params);
    await queryClient.invalidateQueries({
      queryKey: [PROJECTS_API.getAllSavedProducts.api],
    });
    return resp;
  };
  return useMutation({
    mutationFn,
  });
};

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_API.getAllProjects.api],
    queryFn: getAllProjects,
  });
};
