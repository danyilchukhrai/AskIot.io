'use client';
import Button from '@/components/Button';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge';
import { REQUEST_QUOTE_TAB_KEYS } from '@/constants/quotes';
import RequestQuoteOverview from './RequestQuoteOverview';
import Tabs from '@/components/Tabs';

interface IRequestQuoteProps {}

const RequestQuote: FC<IRequestQuoteProps> = (props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const tabs = [
    {
      key: REQUEST_QUOTE_TAB_KEYS.Overview,
      label: 'Overview',
      component: <RequestQuoteOverview />,
    },
    {
      key: REQUEST_QUOTE_TAB_KEYS.Activity,
      label: 'Activity',
      component: <div>Activity</div>,
    },
  ];

  return (
    <div className="request-quote-container p-8">
      <Button className="flex" variant="secondary" onClick={handleBack}>
        <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
        <span className="ml-2.5">Back</span>
      </Button>
      <div className="quote-request p-6 shadow rounded-xl flex items-center justify-between mt-5">
        <div>
          <div className="flex items-center">
            <p className="text-black text-xl font-medium mr-4">Quote</p>
            <Badge label="Draft" color="orange" />
          </div>
          <p className="text-gray-600 text-s mt-1.5">
            <span>Tank monitoring</span>
            <span className="inline-block w-[1px] h-3 bg-gray-200 mx-3"></span>
            <span>quoteID sd8lanr98s2bh4gv</span>
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 text-base mr-4">Draft quote saved 8 seconds ago</p>
          <Button className="mr-4" variant="secondary">
            Share
          </Button>
          <Button>Submit Request</Button>
        </div>
      </div>
      <div className="quote-tabs mt-5">
        <Tabs tabs={tabs} disabledSpaceBetween />
      </div>
    </div>
  );
};

export default RequestQuote;
