import { IRecommendationInfo } from '../iot-gpt/type';

export interface ICreateNewProjectBody {
  userId: string;
  name: string;
}

export interface IProjectItem {
  project_id: number;
  name: string;
  created_at: string;
  user_id: string;
}

export interface IAddProductToProjectBody {
  type: string;
  productId: number | string;
}

export interface ISavedProduct {
  project_id: number;
  products: IRecommendationInfo[];
}

export interface IRemoveProductFormProjectParams {
  productId: number;
  projectId: number;
  type: string;
}

export interface IProject {
  project_id: number;
  name: string;
  cover_image: string | null;
}
