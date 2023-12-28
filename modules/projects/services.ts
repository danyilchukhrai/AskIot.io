import { PROJECTS_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import {
  IAddProductToProjectBody,
  ICreateNewProjectBody,
  IProject,
  IProjectItem,
  IRemoveProductFormProjectParams,
  ISavedProduct,
} from './types';

export const getAllProjectsByUser = async (): Promise<IProjectItem[]> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: PROJECTS_API.getAllProjectsByUser.api,
  });

  return result.data;
};

export const createNewProject = async (data: ICreateNewProjectBody): Promise<any> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: PROJECTS_API.getAllProjectsByUser.api,
  });

  return result.data;
};

export const addProductToProject = async ({
  projectId,
  data,
}: {
  projectId: string | number;
  data: IAddProductToProjectBody;
}): Promise<{ message: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: PROJECTS_API.addProductToProject.api(projectId),
  });

  return result.data;
};

export const checkProductSaved = async (
  productId: string | number,
): Promise<{ saved: boolean }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: PROJECTS_API.checkProductSaved.api(productId),
  });

  return result.data;
};

export const getAllSavedProducts = async (): Promise<ISavedProduct[]> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: PROJECTS_API.getAllSavedProducts.api,
  });

  return result.data;
};

export const removeProductFromProject = async ({
  productId,
  projectId,
  type,
}: IRemoveProductFormProjectParams): Promise<{ message: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data: {
      type,
    },
    url: PROJECTS_API.removeProductFromProject.api(projectId, productId),
  });

  return result.data;
};

export const getAllProjects = async (): Promise<IProject[]> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: PROJECTS_API.getAllProjects.api,
  });

  return result.data;
};
