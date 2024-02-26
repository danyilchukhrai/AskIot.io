import Layout from '@/components/AppLayout';
import AuthProvider from '@/providers/AuthProvider';
import UserProvider from '@/providers/UserProvider';
import UserTypeProvider from '@/providers/UserTypeProvider';
import BotProvider from '@/providers/BotProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserTypeProvider>
        <UserProvider>
          <BotProvider>
            <Layout>{children}</Layout>
          </BotProvider>
        </UserProvider>
      </UserTypeProvider>
    </AuthProvider>
  );
}
