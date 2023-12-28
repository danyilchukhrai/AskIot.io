import AuthPageLayout from '@/components/AuthPageLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthPageLayout>{children}</AuthPageLayout>;
}
