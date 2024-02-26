export enum SUBSCRIPTION_PLAN {
  FREE = 'Free',
  UNLIMITED = 'Unlimited',
}

export enum SUBSCRIPTION_PLANS {
  FREE = 'free',
  PROFESSIONAL = 'professional',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise',
}

export const PLANS_DATA = {
  [SUBSCRIPTION_PLANS.FREE]: {
    title: 'Free Plan - Explore AI',
    monthlyPrice: `<span>$0</span><span class='text-gray-500 font-normal text-l'>/month</span>`,
    annuallyPrice: `<span>$0</span><span class='text-gray-500 font-normal text-l'>/year</span>`,
    includes: ['1 lead per month', 'Listed on askIoT Marketplace', 'Community Support'],
    button: 'Sign Up for Free',
    name: SUBSCRIPTION_PLANS.FREE,
  },
  [SUBSCRIPTION_PLANS.PROFESSIONAL]: {
    title: 'Professional Plan - Engage & Grow',
    monthlyPrice: `<span>$199</span><span class='text-gray-500 font-normal text-l'>/month</span>`,
    annuallyPrice: `<span>$1,990</span><span class='text-gray-500 font-normal text-l'>/year</span>`,
    includes: [
      'Verified Badge: Enhance your credibility in the marketplace.',
      'Leads: Receive up to 5 high-quality leads per month.',
      'AI Chatbot: Engage visitors on your website, capturing leads automatically.',
      'Messages: Handle up to 4,000 messages per month through the chatbot.',
      'Web Page Training: Train the chatbot with up to 200 of your web pages.',
      'File Uploads: Upload up to 10 files (up to 10 MB per file) for training the chatbot.',
      'Email Support: Get your queries resolved with our dedicated email support.',
    ],
    button: 'Start free trial',
    name: SUBSCRIPTION_PLANS.PROFESSIONAL,
  },
  [SUBSCRIPTION_PLANS.BUSINESS]: {
    title: 'Business Plan - Expand Your Reach',
    monthlyPrice: `<span>$549</span><span class='text-gray-500 font-normal text-l'>/month</span>`,
    annuallyPrice: `<span>$5,500</span><span class='text-gray-500 font-normal text-l'>/year</span>`,
    includes: [
      'Verified Badge',
      'Up to 10 leads per month',
      'Promoted on similar quote requests',
      'AI Chatbot',
      'Up to 10k messages per month',
      'CRM Integration',
      'Up to 1000 training web pages',
      '100 file uploads',
      'Up to 10 MB per file',
      'Priority Email Support',
    ],
    button: 'Start free trial',
    name: SUBSCRIPTION_PLANS.BUSINESS,
  },
  [SUBSCRIPTION_PLANS.ENTERPRISE]: {
    title: 'Enterprise Plan - leads from marketplace, AIchatbot and GPT store',
    monthlyPrice: `<span>$99</span><span class="text-blue-500 font-normal text-l">/month</span><span class="text-gray-100 font-extralight text-s"> (*includes AI chatbot for your website)</span>`,
    // ...
    annuallyPrice: `<span>$990</span><span class='text-blue-500 font-normal text-l'>/year</span> <span class="text-gray-100 font-extralight text-s"> (*includes AI chatbot for your website)</span>`,
    includes: [
      'AI Chatbot',
      'Unlimited Leads',
      'Unlimited Users',
      'Chatbot trained upto 200 web pages',
      'Hubspot Integration',
      'Salesforce Integration',
      '50 file uploads for Chatbot training',
      'Up to 10 MB per file',
      'AI Lead verification',
      '24/7 Priority Support'
    ],
    button: 'Start 30 day free trial',
    name: SUBSCRIPTION_PLANS.ENTERPRISE,
  },
};

export enum PLAN_TERM {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}