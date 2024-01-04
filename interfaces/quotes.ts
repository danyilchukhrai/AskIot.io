export interface IQuote {
  id: string;
  name: string;
  code: string;
  numOfProduct: number;
  images: string[];
  manufacturer: {
    name: string;
    image: string;
  };
  amount: number | null;
  status: number;
  statusName: string;
}

export interface IProductDetails {
  company: string;
  device_type: string;
  id: number;
  product_image: string;
  product_name: string;
  industries: string;
  lte: string;
  name: string;
  network_technology: string;
  product_type: string;
  slug: string;
  type: string;
  vendorlogo: string;
  vendorname: string;
  website: string;
  vendorid: number;
  category: string;
  quantity: number;
  offered_price: string;
}

export interface IQuoteDetails {
  quote_id: number;
  requestor_user_id: string;
  vendor_user_id: string;
  product_id: number;
  type: string;
  vendorid: number;
  quantity: number;
  offered_price: string;
  alternative_product_id: any;
  alternative_price: any;
  status: string;
  requested_by_date: Date;
  message_content: string;
  user_to_vendor_message: string | null;
  vendor_to_user_message: string | null;
  user: { first_name: string; last_name: string; website: string };
  productDetails: {
    Product: IProductDetails[];
    alternate_products: any[];
    specifications: { name: string; value: string; icon: string }[];
  };
}

export interface IProviderFormData {
  offeredPrice: number;
  vendorNotes: string;
}
