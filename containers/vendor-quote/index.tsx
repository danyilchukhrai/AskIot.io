import { FC } from 'react';
import VendorQuoteHeader from './components/VendorQuoteHeader';
import VendorQuoteBody from './components/VendorQuoteBody';

interface IVendorQuoteProps {}

const VendorQuote: FC<IVendorQuoteProps> = (props) => {
  return (
    <section className="vendor-quote-section md:p-8 p-4">
      <VendorQuoteHeader />
      <VendorQuoteBody />
    </section>
  );
};

export default VendorQuote;
