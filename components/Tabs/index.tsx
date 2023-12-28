import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';

export interface ITab {
  key: number;
  label: ReactNode;
  component: ReactNode;
  isHidden?: boolean;
}

type TabsVariant = 'primary' | 'secondary';

interface ITabsProps {
  tabs: ITab[];
  disabledSpaceBetween?: boolean;
  tabItemStyles?: string;
  variant?: TabsVariant;
}

const Tabs: FC<ITabsProps> = ({
  tabs = [],
  disabledSpaceBetween = false,
  tabItemStyles = '',
  variant = 'primary',
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || 0);
  const isPrimary = variant === 'primary';

  const handleTabChange = (key: number) => {
    setActiveTab(key);
  };

  return (
    <div className="tab-container">
      <div className="tab-header">
        <ul
          className={clsx(
            'p-0.5 bg-gray rounded-lg flex flex-wrap',
            {
              'justify-between': !disabledSpaceBetween,
            },
            isPrimary ? 'bg-gray' : 'bg-white',
          )}
        >
          {tabs
            .filter((it) => !it.isHidden)
            .map((item) => {
              const isActiveTab = activeTab === item.key;
              return (
                <li className={clsx('pr-0 last:pr-0', tabItemStyles)} key={item.key}>
                  <div
                    className={clsx(
                      'px-4 py-2 rounded-[6px] cursor-pointer',
                      isActiveTab
                        ? isPrimary
                          ? 'bg-white shadow-xs'
                          : 'bg-gray-100'
                        : 'bg-transparent',
                    )}
                    onClick={() => handleTabChange(item.key)}
                  >
                    <p
                      className={clsx(
                        'text-s md:text-base font-medium text-center',
                        isActiveTab
                          ? 'text-gray-1000'
                          : isPrimary
                          ? 'text-gray-600'
                          : 'text-gray-700',
                      )}
                    >
                      {item.label}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="tab-content">{tabs.find((item) => item.key === activeTab)?.component}</div>
    </div>
  );
};

export default Tabs;
