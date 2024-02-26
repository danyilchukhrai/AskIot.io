export interface IProviderStatusResponse {
  status: null | boolean;
  response: string;
  vendorid?: string | number;
  vendorslug: string;
}
export interface IInviteUserBody {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IListVendorUsersResponse {
  users: IUser[];
}