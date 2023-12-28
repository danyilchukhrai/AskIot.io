import Input from '@/components/Input';
import Tabs from '@/components/Tabs';
import { QUOTE_STATUS, QUOTE_TAB_KEYS } from '@/constants/quotes';
import { FC } from 'react';
import QuotesTable from './components/QuotesTable';
import UserTypeProvider, { useUserTypeContext } from '@/providers/UserTypeProvider';

interface IQuotesProps {}

const Quotes: FC<IQuotesProps> = () => {
  const { currentUserType } = useUserTypeContext();
  const tabs = [
    {
      key: QUOTE_TAB_KEYS.All,
      label: 'All',
      component: <QuotesTable currentUserType={currentUserType} />,
    },
    {
      key: QUOTE_TAB_KEYS.Pending,
      label: 'Pending',
      component: <QuotesTable currentUserType={currentUserType} status={QUOTE_STATUS.Pending} />,
    },
    {
      key: QUOTE_TAB_KEYS.Requested,
      label: 'Requested',
      component: <QuotesTable currentUserType={currentUserType} status={QUOTE_STATUS.Requested} />,
    },
  ];

  return (
    <UserTypeProvider>
      <section className="quotes-section md:p-8 p-4">
        <div className="section-header relative">
          <div className="search-filter flex items-center md:absolute top-0 right-0 flex-wrap">
            <Input className="md:w-[240px] w-full mb-4 md:mb-0" placeholder="Search" />
          </div>
          <Tabs tabs={tabs} variant="secondary" disabledSpaceBetween />
        </div>
      </section>
    </UserTypeProvider>
  );
};

export default Quotes;
