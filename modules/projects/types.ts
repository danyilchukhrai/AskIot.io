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
  id: number;
  name: string;
  type: string;
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
