// FeedbackBadge.tsx
import React, { FC } from 'react';

interface FeedbackBadgeProps {
    feedback?: boolean | null; // feedback can be boolean or null/undefined
  }

  const FeedbackBadge: FC<FeedbackBadgeProps> = ({ feedback }) => {
    if (feedback === null || feedback === undefined) {
      return null; // Don't render anything if feedback is null or undefined
    }
  
    const badgeStyle = feedback
      ? 'bg-blue-600 text-white' // Positive feedback
      : 'bg-black-500 text-white'; // Negative feedback
  
    return (
      <span className={`inline-block rounded-full py-1 px-2.5 text-xs font-medium ${badgeStyle}`}>
        {feedback ? 'Rated Positive' : 'Rated Negative'}
      </span>
    );
  };
  
  export default FeedbackBadge;
