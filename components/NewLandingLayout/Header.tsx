'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import TypeFormPopupButton from '../TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '../PublicLayout/Header';

interface IHeaderProps {}

const NAV = [
  {
    label: 'Create IoT Solution',
    href: '/',
  },
  {
    label: 'IoT Providers',
    href: '/providers',
  },
];

const NewHeader: FC<IHeaderProps> = (props) => {
  return <Header isNewLanding />;
};

export default NewHeader;
