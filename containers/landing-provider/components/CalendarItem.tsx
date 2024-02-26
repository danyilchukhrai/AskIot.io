'use client';

import { FC, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface ICalendarSectionProps {
  title: string;
  description: string;
}

const CalendarSection: FC<ICalendarSectionProps> = ({ title, description }) => {
  useEffect(() => {
    // Immediately-invoked async function to configure the Cal UI
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#3f6bf5", // Set your brand color here
            // ... other CSS variables
          },
          dark: {
            // Set the similar variables as in light theme but for dark mode.
          }
        }
      });
    })();
  }, []);

  return (
    <div className='calendar-section flex flex-col items-center w-full py-10'>
      <p className="text-4xl font-bold leading-[56px] text-gray-1200 text-center">{title}</p>
      <p className="text-gray-1300 text-l font-medium pt-5 pb-7 text-center">{description}</p>
      <Cal 
        calLink="askiot/30min"
        style={{width:"100%", height:"100%", overflow:"scroll"}}
      />
    </div>
  );
};

export default CalendarSection;
