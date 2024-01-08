import Layout from '@/components/AppLayout';
import AuthProvider from '@/providers/AuthProvider';
import UserProvider from '@/providers/UserProvider';
import UserTypeProvider from '@/providers/UserTypeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserTypeProvider>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </UserTypeProvider>
    </AuthProvider>
  );
}
