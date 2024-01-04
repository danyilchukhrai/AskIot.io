export const deviceTypeOptions = [
  'People Tracking',
  'Router',
  'Remote Monitoring and Control',
  'Vehicle Monitoring',
  'Rugged Handheld / Smartphone',
];

export const networkTechnologyOptions = ['LTE with GSM/UMTS', 'LTE Only'];
export const lteCategoryOptions = ['Cat M1', 'Cat 1', 'Cat 4', 'Cat 6'];
export const simTypeOptions = [
  'Standard/Industrial Mini SIM (2FF)',
  'Industrial Soldered SIM (MFF2 Embedded)',
  'Standard Nano SIM (4FF)',
];
export const securityLevelOptions = ['Options based on your specific requirements'];
export const emsOptions = ['Verizon FOTA Solution (only)', 'Non Verizon FOTA Solution (only)'];
export const mmsOptions = ['LWM2M', 'OMADM', 'Other'];
export const fotaClientTypeOptions = ['iOS', 'Linux', 'Android'];
export const operatingSystemOptions = ['iOS', 'Linux', 'Other', 'Android'];
export const dualSimTypeOptions = ['Standard/Industrial', 'Mini SIM (2FF)'];
export const natOptions = [
  'NATv4 and NPT',
  'Linux NAT from IP tables',
  'DNAT,One-to-one',
  'one-to-many',
  'TBD',
  'None',
  'N/A',
];
export const supportedGlobalMarkets = [
  {
    group: 'North America',
    items: ['USA', 'Canada', 'Mexico'],
  },
  {
    group: 'Europe',
    items: [
      'Western Europe (UK, Germany, France, etc.)',
      'Eastern Europe (Poland, Russia, etc.)',
      'Scandinavia (Sweden, Norway, Finland)',
      'Southern Europe (Italy, Spain, Greece)',
    ],
  },
  {
    group: 'Asia',
    items: [
      'East Asia (China, Japan, South Korea)',
      'Southeast Asia (Indonesia, Thailand, Singapore)',
      'South Asia (India, Pakistan, Bangladesh)',
      'Central Asia (Kazakhstan, Uzbekistan)',
    ],
  },
  {
    group: 'South America',
    items: ['Brazil', 'Argentina', 'Chile', 'Colombia'],
  },
  {
    group: 'Africa',
    items: ['North Africa (Egypt, Morocco)', 'Sub-Saharan Africa (Nigeria, Kenya, South Africa)'],
  },
  {
    group: 'Middle East',
    items: [
      'Gulf Countries (Saudi Arabia, UAE, Qatar)',
      'Other Middle Eastern Countries (Turkey, Iran, Israel)',
    ],
  },
  {
    group: 'Australia and New Zealand',
    items: ['Australia and New Zealand'],
  },
  {
    group: 'Australia and New Zealand',
    items: ['Applicable for devices with worldwide compatibility or market reach'],
  },
  {
    group: 'Other',
    items: ['Option for users to specify other markets'],
  },
];

export const industries = [
  {
    group: 'Agricultural',
    items: ['Crop Management', 'Livestock Monitoring', 'Agri-Equipment Tracking'],
  },
  {
    group: 'Industrial / Manufacturing',
    items: ['Factory Automation', 'Supply Chain Management', 'Quality Control'],
  },
  {
    group: 'Healthcare',
    items: ['Patient Monitoring', 'Medical Equipment Tracking', 'Health Data Analytics'],
  },
  {
    group: 'Transportation',
    items: ['Fleet Management', 'Traffic Control Systems', 'Public Transport'],
  },
  {
    group: 'Utilities',
    items: ['Energy Management', 'Water and Waste Management', 'Smart Grids'],
  },
  {
    group: 'Retail',
    items: ['Inventory Management', 'Customer Experience Enhancement', 'Supply Chain Optimization'],
  },
  {
    group: 'Financial Services',
    items: ['Asset Tracking', 'Fraud Detection', 'Automated Teller Machines (ATMs)'],
  },
  {
    group: 'Media and Entertainment',
    items: ['Content Distribution', 'Audience Analytics', 'Event Management'],
  },
  {
    group: 'Education',
    items: ['Campus Safety', 'Educational Tools', 'Research and Development'],
  },
  {
    group: 'Government and Public Sector',
    items: ['Smart Cities', 'Public Safety', 'Infrastructure Management'],
  },
  {
    group: 'Construction',
    items: ['Project Management', 'Equipment Tracking', 'Safety Compliance'],
  },
  {
    group: 'Energy',
    items: ['Renewable Energy Monitoring', 'Oil and Gas Industry', 'Energy Efficiency Solutions'],
  },
  {
    group: 'Technology and IT',
    items: ['Data Centers', 'Network Management', 'Research and Innovation'],
  },
  {
    group: 'Telecommunications',
    items: ['Network Infrastructure', 'Customer Service Solutions', 'Mobile and Wireless Services'],
  },
  {
    group: 'Hospitality',
    items: ['Hotel Management Systems', 'Customer Service Enhancements', 'Event Coordination'],
  },
  {
    group: 'Real Estate',
    items: ['Smart Home Technologies', 'Property Management', 'Real Estate Analytics'],
  },
  {
    group: 'Automotive',
    items: ['Vehicle Telematics', 'Autonomous Vehicles', 'Fleet Management'],
  },
  {
    group: 'Aerospace',
    items: ['Aircraft Monitoring', 'Traffic Management Systems', 'Safety and Maintenance'],
  },
  {
    group: 'Other',
    items: ['Option for users to specify unique or emerging industries'],
  },
];

export const securityProtocolOptions = [
  {
    label: 'WEP',
    value: 'WEP',
  },
  {
    label: 'WPA',
    value: 'WPA',
  },
  {
    label: 'WPA-PSK/WPA2-PSK',
    value: 'WPA-PSK/WPA2-PSK',
  },
  {
    label: 'TKIP',
    value: 'TKIP',
  },
  {
    label: 'WPA-802.1X/WPA2-802.1X',
    value: 'WPA-802.1X/WPA2-802.1X',
  },
];

export const vnpSupportOptions = [
  {
    label: 'IPSec',
    value: 'IPSec',
  },
  {
    label: 'OpenVPN',
    value: 'OpenVPN',
  },
  {
    label: 'L2TP',
    value: 'L2TP',
  },
  {
    label: 'PPTP',
    value: 'PPTP',
  },
  {
    label: 'GRE',
    value: 'GRE',
  },
  {
    label: 'MPN',
    value: 'MPN',
  },
  {
    label: 'VPN pass-through',
    value: 'VPN pass-through',
  },
  {
    label: 'IPSec with SSL',
    value: 'IPSec with SSL',
  },
  {
    label: 'CP Secure VPN',
    value: 'CP Secure VPN',
  },
  {
    label: 'PepVPN',
    value: 'PepVPN',
  },
];

export const createVendorProductCheckboxes = [
  'accelerometer',
  'asia',
  'audio',
  'battery_safety',
  'bluetooth',
  'camera',
  'canada_mexico',
  'cdma',
  'developer_kit',
  'diagnostics',
  'e911',
  'euicc',
  'europe',
  'evdo',
  'expansion_card_slots',
  'fax_capable',
  'firewall',
  'fixed_wireless_access_fwa',
  'fota_for_baseband_modem',
  'global_capable',
  'gnss',
  'gprs',
  'gps',
  'gsm',
  'keyboard',
  'lte',
  'lte_global_roaming',
  'magnetic_card_reader',
  'multi_apn',
  'numbershare',
  'on_site_lte_5g',
  'persistent_prefix_ipv6',
  'printer',
  'puerto_rico_latin_america',
  'rain_dust_resistance',
  'remote_management',
  'rj_11',
  'scanning_technology',
  'serial',
  'smart_card_reader',
  'sms_capability',
  'split_data_routing_aka_dual_apn',
  'support_5g',
  'umts',
  'vehicle_mounting',
  'voice_transmission_capable',
  'wea_wireless_emergency_alert',
  'wifi',
  'wireless_private_network',
  'z_wave',
  'zigbee',
];

export const createVendorDeviceDefaultValue = {
  product_url: '',
  product_name: '',
  product_description: '',
  product_image: '',
  device_type: '',
  industries: [],
  key_features: '',
  specifications: {
    network_technology: '',
    lte_category_support: '',
    sim_type: '',
    security_level: '',
    ems: '',
    mms: '',
    fota_client_type: '',
    operating_system: '',
    dual_sim_type: '',
    nat: [],
    ...createVendorProductCheckboxes.reduce(
      (prev, currentItem) => ({
        ...prev,
        [currentItem]: false,
      }),
      {},
    ),
    antenna: '',
    battery: '',
    display_resolution: '',
    ethernet_ports: '',
    usb_ports: '',
    weight: '',
    operating_temperature: '',
    storage_temperature: '',
    relative_humidity: '',
    supported_global_markets: [],
    security_protocol: [],
    vpn_support: [],
  },
  file: {},
};

export const createVendorProductDefaultValue = {
  product_name: '',
  product_description: '',
  product_url: '',
  product_image: '',
  product_details: [
    {
      name: '',
      description: '',
    },
  ],
  usecase: '',
  file: {},
};

export enum CREATE_VENDOR_PRODUCT_TYPE {
  DEVICES = 'devices',
  PRODUCTS = 'products',
}
