import { ChangeEvent, FC, useEffect, useState } from 'react';
import { SectionSuggested } from './VendorQuoteBody';
import Input from '@/components/Input';
import { IProduct } from '@/interfaces/products';
import { getProductList } from '@/services/dummy';
import Image from 'next/image';
import { debounce } from 'lodash';
import Button from '@/components/Button';
import clsx from 'clsx';

interface ISuggestProductsProps {
  onSelectAlternativeProduct: (product?: IProduct) => void;
  onCloseDrawer: () => void;
}

const SuggestProducts: FC<ISuggestProductsProps> = ({
  onSelectAlternativeProduct,
  onCloseDrawer,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    handleFilterProducts();
  }, [searchKey, products]);

  const handleAddToQuote = () => {
    onSelectAlternativeProduct(selectedProduct);
    setSelectedProduct(undefined);
  };

  const handleFetchProducts = async () => {
    try {
      const res = await getProductList();
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterProducts = debounce(() => {
    if (!searchKey) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        [...products].filter((it) => it.name.toLowerCase().includes(searchKey.toLowerCase())),
      );
    }
  }, 500);

  return (
    <div className="suggest flex flex-col h-full">
      <p className="text-gray-1000 text-xl font-medium ml-10 pb-4">Suggest alternative product</p>
      <div className="product-list pt-15 flex-1">
        <Input
          value={searchKey}
          placeholder="Search product..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value)}
        />
        <ul className="list border border-gray-100 rounded-xl mt-4">
          {filteredProducts.map((it) => (
            <li
              key={it.id}
              className={clsx(
                'group hover:bg-primary-500 hover:cursor-pointer md:py-5 md:px-6 py-2 px-3 border-b border-gray-100 last:border-b-0',
                {
                  'bg-primary-500': selectedProduct?.id === it.id,
                },
              )}
              onClick={() => setSelectedProduct(it)}
            >
              <div className="flex items-center justify-between">
                <div className="md:w-[159px] w-25 flex items-center md:flex-row flex-col">
                  <Image
                    className="rounded-[6px]"
                    src={it.image}
                    alt={it.name}
                    width={60}
                    height={40}
                  />
                  <div className="md:ml-4 mt-1 md:mt-0 flex flex-col items-center md:block">
                    <p
                      className={clsx(
                        'md:text-base text-s text-gray-1000 font-medium group-hover:text-white',
                        {
                          'text-white': selectedProduct?.id === it.id,
                        },
                      )}
                    >
                      {it.name}
                    </p>
                    <p
                      className={clsx(
                        'text-gray-600 text-xs md:text-s mt-1 group-hover:text-primary-200',
                        {
                          'text-primary-200': selectedProduct?.id === it.id,
                        },
                      )}
                    >
                      {it.ref}
                    </p>
                  </div>
                </div>
                <div className="w-[200px]">
                  <p
                    className={clsx(
                      'text-primary-500 text-xs font-medium mb-1 group-hover:text-white',
                      {
                        'text-white': selectedProduct?.id === it.id,
                      },
                    )}
                  >
                    Router
                  </p>
                  <p
                    className={clsx(
                      'text-gray-1000 text-xs line-clamp-2 group-hover:text-primary-200',
                      {
                        'text-primary-200': selectedProduct?.id === it.id,
                      },
                    )}
                  >
                    {it.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer flex justify-end">
        <Button variant="secondary" onClick={onCloseDrawer}>
          Cancel
        </Button>
        <Button className="ml-4" disabled={!selectedProduct} onClick={handleAddToQuote}>
          Add to quote
        </Button>
      </div>
    </div>
  );
};

export default SuggestProducts;
