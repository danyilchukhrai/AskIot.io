'use client';

import { useGetAllSavedProducts } from '@/modules/projects/hooks';
import * as React from 'react';

interface ISavedProductsProviderProps {
  children: React.ReactNode;
}

const SavedProductsContext = React.createContext<{
  isSavedProduct: (productId?: number) => boolean;
}>({
  isSavedProduct: () => false,
});

export const useSavedProductsContext = () => {
  const context = React.useContext(SavedProductsContext);
  if (!context) {
    throw new Error('SavedProductsContext must be used within provider!');
  }
  return context;
};

const SavedProductsProvider: React.FunctionComponent<ISavedProductsProviderProps> = (props) => {
  const { data: allSavedProducts = [] } = useGetAllSavedProducts();

  const isSavedProduct = (productId?: number) => {
    if (typeof productId !== 'number') return false;

    return allSavedProducts.findIndex((it) => it?.id === productId) >= 0;
  };

  return (
    <SavedProductsContext.Provider value={{ isSavedProduct }}>
      {props.children}
    </SavedProductsContext.Provider>
  );
};

export default SavedProductsProvider;
