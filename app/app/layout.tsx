import Layout from '@/components/AppLayout';
import AuthProvider from '@/providers/AuthProvider';
import UserTypeProvider from '@/providers/UserTypeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserTypeProvider>
        <Layout>{children}</Layout>
      </UserTypeProvider>
    </AuthProvider>
  );
}
