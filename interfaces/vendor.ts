export interface IVendor {
  id: string;
  cover: string;
  avatar: string;
  name: string;
  status: string;
  address: string;
  phoneNumber: string;
  email: string;
  webiste: string;
  members: {
    name: string;
    position: string;
    image: string;
  }[];
  reviews: number;
  rating: number;
  responseTime: string;
  deliveryTime: string;
  details: {
    overview: string;
    industry: string;
    size: string;
    headquarters: string;
    founded: string;
    specialties: string;
    ceo: string;
  };
}
