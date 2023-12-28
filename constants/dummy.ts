import { IChatChannel } from '@/interfaces/messages';
import { v4 as uuidv4 } from 'uuid';
import { QUOTE_STATUS } from './quotes';

export const DUMMY_PRODUCT_LIST = [
  {
    id: 'tankmon1',
    name: 'TankMon1',
    ref: 'Ref 76D87YD',
    quantity: 10,
    unitPrice: 400,
    description:
      'IP68/Nema 6 Self-calibrating Self contained edge computing device Remote IoT sensor configuration Battery powered 5yr life',
    manufacturer: {
      id: 'manufacturer1',
      name: 'Manufacturer 1',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse. `,
    },
    image: '/assets/images/tank-mon-1.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.`,
  },
  {
    id: 'tankmon2',
    name: 'TankMon2',
    ref: 'Ref 76D87YD',
    quantity: 10,
    unitPrice: 10,
    description:
      'IP68/Nema 6 Self-calibrating Self contained edge computing device Remote IoT sensor configuration Battery powered 5yr life',
    manufacturer: {
      id: 'manufacturer2',
      name: 'Manufacturer 2',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse.`,
    },
    image: '/assets/images/tank-mon-2.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.
    Augue ac sit dolor pretium auctor pretium. Senectus egestas pretium at egestas vel nibh dignissim. Elit morbi ut ultrices cursus et. At sed lectus augue sed. Mi etiam et sem lectus auctor lacus mauris a.`,
  },
  {
    id: 'tankmon3',
    name: 'TankMon3',
    ref: 'Ref 76D87YD',
    quantity: 10,
    unitPrice: 10,
    description:
      'IP68/Nema 6 Self-calibrating Self contained edge computing device Remote IoT sensor configuration Battery powered 5yr life',
    manufacturer: {
      id: 'manufacturer3',
      name: 'Manufacturer 3',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse.`,
    },
    image: '/assets/images/tank-mon-3.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.
    Augue ac sit dolor pretium auctor pretium. Senectus egestas pretium at egestas vel nibh dignissim. Elit morbi ut ultrices cursus et. At sed lectus augue sed. Mi etiam et sem lectus auctor lacus mauris a.`,
  },
  {
    id: 'tankmon6',
    name: 'TankMon6',
    ref: 'Ref 76D87YD',
    quantity: 10,
    unitPrice: 60,
    description:
      'IP68/Nema 6 Self-calibrating Self contained edge computing device Remote IoT sensor configuration Battery powered 5yr life',
    manufacturer: {
      id: 'manufacturer5',
      name: 'Manufacturer 5',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse.`,
    },
    image: '/assets/images/tank-mon-6.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.
    Augue ac sit dolor pretium auctor pretium. Senectus egestas pretium at egestas vel nibh dignissim. Elit morbi ut ultrices cursus et. At sed lectus augue sed. Mi etiam et sem lectus auctor lacus mauris a.`,
  },
];

export const VENDOR_DETAILS = {
  id: 'samsung',
  cover: '/assets/images/vendor-cover.png',
  avatar: '/assets/images/vendor-avatar.png',
  name: 'Samsung',
  status: 'Online',
  address: '12100 Samsung Boulevard, Austin, Texas 78754, USA',
  phoneNumber: '(201) 229-4000',
  email: 'info@samsung.com',
  webiste: 'samsung.com',
  members: [
    {
      name: 'Kim Kinam',
      position: 'CEO',
      image: '/assets/images/avatar-default.png',
    },
    {
      name: 'Justin Culhan',
      position: 'Sales Rep.',
      image: '/assets/images/avatar-default.png',
    },
    {
      name: 'Jane Dokidis',
      position: 'Sales Manager',
      image: '/assets/images/avatar-default.png',
    },
  ],
  reviews: 257,
  rating: 4.6,
  responseTime: '4 days',
  deliveryTime: '2 weeks',
  details: {
    overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
    ceo: 'Kinam Kim',
    industry: 'Electronics',
    size: '1,001-5,000 employees',
    headquarters: 'Oakland, California',
    founded: '2012',
    specialties: 'Data Integration, ETL, data pipelines, and ELT',
  },
};

export const DUMMY_VENDORS = [
  {
    id: 'samsung',
    cover: '/assets/images/vendor-cover.png',
    avatar: '/assets/images/vendor-avatar.png',
    name: 'Samsung',
    status: 'Online',
    address: '12100 Samsung Boulevard, Austin, Texas 78754, USA',
    phoneNumber: '(201) 229-4000',
    email: 'info@samsung.com',
    webiste: 'samsung.com',
    members: [
      {
        name: 'Kim Kinam',
        position: 'CEO',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Justin Culhan',
        position: 'Sales Rep.',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Jane Dokidis',
        position: 'Sales Manager',
        image: '/assets/images/avatar-default.png',
      },
    ],
    reviews: 257,
    rating: 4.6,
    responseTime: '4 days',
    deliveryTime: '2 weeks',
    details: {
      overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
      ceo: 'Kinam Kim',
      industry: 'Electronics',
      size: '1,001-5,000 employees',
      headquarters: 'Oakland, California',
      founded: '2012',
      specialties: 'Data Integration, ETL, data pipelines, and ELT',
    },
  },
  {
    id: 'manufacturer1',
    name: 'Manufacturer 1',
    avatar: '/assets/images/manufacturer.svg',
    cover: '/assets/images/vendor-cover.png',
    status: 'Online',
    address: '12100 Manufacturer Boulevard, Austin, Texas 78754, USA',
    phoneNumber: '(201) 229-4000',
    email: 'info@manufacturer1.com',
    webiste: 'manufacturer1.com',
    members: [
      {
        name: 'Kim Kinam',
        position: 'CEO',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Justin Culhan',
        position: 'Sales Rep.',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Jane Dokidis',
        position: 'Sales Manager',
        image: '/assets/images/avatar-default.png',
      },
    ],
    reviews: 257,
    rating: 4.6,
    responseTime: '4 days',
    deliveryTime: '2 weeks',
    details: {
      overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
      ceo: 'Kinam Kim',
      industry: 'Electronics',
      size: '1,001-5,000 employees',
      headquarters: 'Oakland, California',
      founded: '2012',
      specialties: 'Data Integration, ETL, data pipelines, and ELT',
    },
  },
  {
    id: 'manufacturer2',
    name: 'Manufacturer 2',
    avatar: '/assets/images/manufacturer.svg',
    cover: '/assets/images/vendor-cover.png',
    status: 'Online',
    address: '12100 Manufacturer Boulevard, Austin, Texas 78754, USA',
    phoneNumber: '(201) 229-4000',
    email: 'info@manufacturer2.com',
    webiste: 'manufacturer2.com',
    members: [
      {
        name: 'Kim Kinam',
        position: 'CEO',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Justin Culhan',
        position: 'Sales Rep.',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Jane Dokidis',
        position: 'Sales Manager',
        image: '/assets/images/avatar-default.png',
      },
    ],
    reviews: 257,
    rating: 4.6,
    responseTime: '4 days',
    deliveryTime: '2 weeks',
    details: {
      overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
      ceo: 'Kinam Kim',
      industry: 'Electronics',
      size: '1,001-5,000 employees',
      headquarters: 'Oakland, California',
      founded: '2012',
      specialties: 'Data Integration, ETL, data pipelines, and ELT',
    },
  },
  {
    id: 'manufacturer3',
    name: 'Manufacturer 3',
    avatar: '/assets/images/manufacturer.svg',
    cover: '/assets/images/vendor-cover.png',
    status: 'Online',
    address: '12100 Manufacturer Boulevard, Austin, Texas 78754, USA',
    phoneNumber: '(201) 229-4000',
    email: 'info@manufacturer3.com',
    webiste: 'manufacturer3.com',
    members: [
      {
        name: 'Kim Kinam',
        position: 'CEO',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Justin Culhan',
        position: 'Sales Rep.',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Jane Dokidis',
        position: 'Sales Manager',
        image: '/assets/images/avatar-default.png',
      },
    ],
    reviews: 257,
    rating: 4.6,
    responseTime: '4 days',
    deliveryTime: '2 weeks',
    details: {
      overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
      ceo: 'Kinam Kim',
      industry: 'Electronics',
      size: '1,001-5,000 employees',
      headquarters: 'Oakland, California',
      founded: '2012',
      specialties: 'Data Integration, ETL, data pipelines, and ELT',
    },
  },
  {
    id: 'manufacturer5',
    name: 'Manufacturer 5',
    avatar: '/assets/images/manufacturer.svg',
    cover: '/assets/images/vendor-cover.png',
    status: 'Online',
    address: '12100 Manufacturer Boulevard, Austin, Texas 78754, USA',
    phoneNumber: '(201) 229-4000',
    email: 'info@manufacturer5.com',
    webiste: 'manufacturer5.com',
    members: [
      {
        name: 'Kim Kinam',
        position: 'CEO',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Justin Culhan',
        position: 'Sales Rep.',
        image: '/assets/images/avatar-default.png',
      },
      {
        name: 'Jane Dokidis',
        position: 'Sales Manager',
        image: '/assets/images/avatar-default.png',
      },
    ],
    reviews: 257,
    rating: 4.6,
    responseTime: '4 days',
    deliveryTime: '2 weeks',
    details: {
      overview: `Lorem ipsum dolor sit amet consectetur. A leo posuere ridiculus ultrices sit mollis. Ultricies a tincidunt ultricies elementum dolor eget felis pharetra volutpat. Facilisis posuere netus ornare lectus massa eu sed condimentum. Etiam vitae sit fusce odio. Suspendisse nisi ac posuere leo gravida. Turpis mollis sit scelerisque sed aliquam pretium proin dolor neque. Augue fusce nibh eget a et phasellus feugiat in. Massa tristique viverra vitae at facilisis. Ultrices odio aenean varius magna sed. 
    Sit varius lorem maecenas laoreet. Aenean mauris commodo viverra viverra. Diam ornare eu nullam magna velit. Vitae rhoncus enim ac nulla mi turpis. Lectus in mattis morbi accumsan lectus elit viverra tincidunt. Viverra proin sagittis faucibus velit ut ipsum fermentum dis maecenas.`,
      ceo: 'Kinam Kim',
      industry: 'Electronics',
      size: '1,001-5,000 employees',
      headquarters: 'Oakland, California',
      founded: '2012',
      specialties: 'Data Integration, ETL, data pipelines, and ELT',
    },
  },
];

export const DUMMY_QUOTES = [
  {
    id: 34,
    name: 'Tank monitoring',
    code: '89275209',
    numOfProduct: 3,
    images: [
      '/assets/images/tank-mon-1.jpeg',
      '/assets/images/tank-mon-2.jpeg',
      '/assets/images/tank-mon-3.jpeg',
    ],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: 2189,
    status: QUOTE_STATUS.Pending,
    statusName: 'Pending',
  },
  {
    id: 35,
    name: 'Components',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-2.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: 1089,
    status: QUOTE_STATUS.Pending,
    statusName: 'Pending',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-3.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: 924,
    status: QUOTE_STATUS.Pending,
    statusName: 'Pending',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 3,
    images: [
      '/assets/images/tank-mon-6.jpeg',
      '/assets/images/tank-mon-1.jpeg',
      '/assets/images/tank-mon-2.jpeg',
    ],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: 824,
    status: QUOTE_STATUS.Pending,
    statusName: 'Pending',
  },
  {
    id: uuidv4(),

    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-1.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: null,
    status: QUOTE_STATUS.Pending,
    statusName: 'Pending',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-2.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: 612,
    status: QUOTE_STATUS.Requested,
    statusName: 'Requested',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-3.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: null,
    status: QUOTE_STATUS.Requested,
    statusName: 'Requested',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-6.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: null,
    status: QUOTE_STATUS.Requested,
    statusName: 'Requested',
  },
  {
    id: uuidv4(),
    name: 'Quote name',
    code: '89275209',
    numOfProduct: 1,
    images: ['/assets/images/tank-mon-1.jpeg'],
    manufacturer: {
      name: 'General Electric',
      image: '/assets/images/manufacturer.svg',
    },
    amount: null,
    status: QUOTE_STATUS.Requested,
    statusName: 'Received',
  },
];

export const DUMMY_CHAT_CHANNELS = [
  {
    id: 'channel-1',
    image: '/assets/icons/samsung.svg',
    title: 'Tracey Howe',
    description: 'Secondary information',
    lastMessage: {
      isCurrentUser: false,
      createdAt: Date.now(),
      content:
        'This device will be back in stock on the 21st , but we can try and see if we can get it earlier',
      type: 'text',
      senderImage: '/assets/icons/samsung.svg',
    },
    isUnread: true,
  },
  {
    id: 'channel-2',
    image: '/assets/icons/vickie.svg',
    title: 'Vickie Kovacek',
    description: 'Secondary information',
    lastMessage: {
      isCurrentUser: false,
      createdAt: Date.now(),
      content:
        'This device will be back in stock on the 21st , but we can try and see if we can get it earlier',
      type: 'text',
      senderImage: '/assets/icons/vickie.svg',
    },
    isUnread: false,
  },
];

export const DUMMY_CHANNEL_MESSAGES = [
  {
    channelId: 'channel-1',
    data: [
      {
        isCurrentUser: true,
        createdAt: Date.now(),
        content: 'When will this device be back in stock?',
        type: 'text',
      },
      {
        isCurrentUser: false,
        createdAt: Date.now(),
        content:
          'This device will be back in stock on the 21st , but we can try and  see if we can get it earlier',
        type: 'text',
        senderImage: '/assets/icons/samsung.svg',
      },
    ],
  },
  {
    channelId: 'channel-2',
    data: [
      {
        isCurrentUser: true,
        createdAt: Date.now(),
        content: 'When will this device be back in stock?',
        type: 'text',
      },
      {
        isCurrentUser: false,
        createdAt: Date.now(),
        content:
          'This device will be back in stock on the 21st , but we can try and  see if we can get it earlier',
        type: 'text',
        senderImage: '/assets/icons/vickie.svg',
      },
    ],
  },
];

export const DEVICE_OFFERS = [
  {
    name: 'Category 1',
    offers: [
      {
        icon: '/assets/icons/bug-ant-icon.svg',
        name: 'Peso',
      },
      {
        icon: '/assets/icons/building-store-icon.svg',
        name: 'Practical',
      },
      {
        icon: '/assets/icons/chat-bubble-left-icon.svg',
        name: 'Connect',
      },
      {
        icon: '/assets/icons/bolt-icon.svg',
        name: 'Human',
      },
    ],
  },
  {
    name: 'Category 2',
    offers: [
      {
        icon: '/assets/icons/calculator-icon.svg',
        name: 'Programming',
      },
      {
        icon: '/assets/icons/chart-bar-icon.svg',
        name: 'Views',
      },
    ],
  },
  {
    name: 'Category 3',
    offers: [
      {
        icon: '/assets/icons/cloud-icon.svg',
        name: 'Infomediaries',
      },
      {
        icon: '/assets/icons/indentification-icon.svg',
        name: 'Purple',
      },
      {
        icon: '/assets/icons/currency-dollar-icon.svg',
        name: 'Deposit',
      },
    ],
  },
];
