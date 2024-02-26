import { Dispatch, SetStateAction, createContext } from 'react';

interface IPublicProductDetailContext {
  isOpenAskAnything: boolean;
  setIsOpenAskAnything: Dispatch<SetStateAction<boolean>>;
}

export const ProductDetailContext = createContext<IPublicProductDetailContext>(
  {} as IPublicProductDetailContext,
);
