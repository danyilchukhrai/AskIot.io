import Drawer, { IDrawerElement } from '@/components/Drawer';
import Modal, { IModalElement } from '@/components/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import { FC, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ProductInfo from './ProductInfo';
import ProductItem from './ProductItem';
import SaveForm from './SaveForm';
import ShareForm from './ShareForm';

interface IProductListProps {
  hiddenDescription?: boolean;
  hideActionButtons?: boolean;
  products?: IRecommendationInfo[];
  disabledOnClickProductEvent?: boolean;
  onClickProduct?: (product: any) => void;
  requestQuote?: boolean;
  onRequestQuote?: () => void;
}

const ProductList: FC<IProductListProps> = ({
  hiddenDescription = false,
  hideActionButtons = false,
  products = [],
  disabledOnClickProductEvent = false,
  onClickProduct,
  requestQuote,
  onRequestQuote,
}) => {
  const productDrawerRef = useRef<IDrawerElement>(null);
  const saveModalRef = useRef<IModalElement>(null);
  const shareModalRef = useRef<IModalElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<IRecommendationInfo>();
  const [disabledCloseDrawer, setDisabledCloseDrawer] = useState(false);
  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  const handleClickProduct = (product?: IRecommendationInfo) => {
    if (disabledOnClickProductEvent) return;
    if (onClickProduct) {
      onClickProduct(product);
    } else {
      setSelectedProduct(product);
      productDrawerRef?.current?.open();
    }
  };

  const handleCloseDrawer = () => {
    productDrawerRef?.current?.close();
  };

  const handleOpenSaveForm = (item?: IRecommendationInfo, isSaved?: boolean) => {
    if (isSaved) {
      toast.info('This product is already saved');
      return;
    }
    setSelectedProduct(item);
    saveModalRef.current?.open();
  };

  return (
    <>
      <div className="rounded-xl shadow">
        {products.map((item, index) => (
          <div className="rounded-t-xl md:rounded-t-none bg-white" key={index}>
            <ProductItem
              key={index}
              product={item}
              hiddenDescription={hiddenDescription}
              hideActionButtons={hideActionButtons}
              onOpenSaveForm={handleOpenSaveForm}
              onOpenShareForm={() => {
                setSelectedProduct(item);
                shareModalRef.current?.open();
              }}
              onClickProduct={handleClickProduct}
              requestQuote={requestQuote}
              onRequestQuote={onRequestQuote}
            />
          </div>
        ))}
      </div>
      <Drawer
        ref={productDrawerRef}
        closeIconClassName="md:!top-0 md:left-0 z-10 -translate-x-full rounded-none rounded-s-[6px] !w-11 !h-11 items-center justify-center hidden md:flex"
        disabledPaddingX
        disabledPaddingY={isMobileMatches}
        closeOnClickOutside={!disabledCloseDrawer}
      >
        <ProductInfo
          product={selectedProduct}
          onCloseDrawer={handleCloseDrawer}
          products={products}
          setDisabledCloseDrawer={setDisabledCloseDrawer}
        />
      </Drawer>
      <Modal ref={saveModalRef} hideButtons>
        <SaveForm product={selectedProduct} onClose={() => saveModalRef.current?.close()} />
      </Modal>
      <Modal paperClassName="md:w-[810px]" ref={shareModalRef} hideButtons>
        <ShareForm product={selectedProduct} />
      </Modal>
    </>
  );
};

export default ProductList;
