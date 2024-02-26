'use client';

import { withRestricted } from '@/HOC/withRestricted';
import AuthPageLayout from '@/components/AuthPageLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthPageLayout>{children}</AuthPageLayout>;
};

export default withRestricted(Layout);
