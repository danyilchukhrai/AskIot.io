import { Dispatch, SetStateAction, createContext } from 'react';

interface IPublicVendorDetailContext {
  isOpenChat: boolean;
  setIsOpenChat: Dispatch<SetStateAction<boolean>>;
}

export const VendorDetailContext = createContext<IPublicVendorDetailContext>(
  {} as IPublicVendorDetailContext,
);
