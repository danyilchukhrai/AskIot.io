'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: any) => {
  const [targetContent, setTargetContent] = useState<Element | DocumentFragment>();

  useEffect(() => {
    const target = document.getElementById('page-wrapper');
    if (target) {
      setTargetContent(target);
    }
  }, []);

  return targetContent ? createPortal(children, targetContent) : null;
};

export default Portal;
