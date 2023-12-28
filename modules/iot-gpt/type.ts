export interface IChatQueryBody {
  threadId: string;
  query: string;
}

export interface IRecommendationInfo {
  id?: number;
  product_id?: number;
  product_image?: string;
  product_name?: string;
  name: string;
  description: string;
  product_description?: string;
  img: string;
  vendorname: string;
  logo: string;
  slug?: string;
  recommendationType?: string;
  vendorid: number;
  device_type: string;
  type: string;
  vendorlogo: string;
}

export interface IChatQueryRecommendation {
  [x: string]: IRecommendationInfo[];
}

export interface IChatQueryResponse {
  greeting: string;
  recommendations: IChatQueryRecommendation;
}

export interface IThread {
  thread_id: string;
  title: string;
  status: string;
  created_date: string;
  isInitialThread?: boolean;
}

export interface IThreadInteraction {
  ai: string;
  id: number;
  user: string;
  keywords: string;
  recommendations?: IChatQueryRecommendation;
  aiLogo?: string;
}

export interface IThreadDetails {
  count: number;
  interactions: IThreadInteraction[];
  results: {
    [x: string | number]: {
      devices: IRecommendationInfo[];
      connectivity: IRecommendationInfo[];
      platforms: IRecommendationInfo[];
    };
  };
}

export interface IProduct {
  id: number;
  slug: string;
  vendorid: number;
  company: string;
  name: string;
  img: string;
  product_type: string;
  device_serp_ai: {
    features: string[];
    introduction: string;
  };
  website: string;
  device_type: string;
  network_technology: string;
  industries: string;
  lte: string;
  vendorName: string;
  vendorLogo: string;
  type: string;
  product_image: string;
  vendorname: string;
  vendorlogo: string;
}

export interface ISpecification {
  name: string;
  value: string;
  icon: string;
}

export interface IRecommendationProductDetail extends IProduct {
  Product: IProduct[];
  specifications: ISpecification[];
  alternate_products: IRecommendationInfo[];
}
