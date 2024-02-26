import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastProvider from '@/providers/ToastProvider';
import '@/styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: 'askIoT - Your AI Powered IoT Marketplace',
  description:
    'Ditch the hassle and complexity of navigating through the fragmented IoT ecosystem . Let askIoT build it for you. No IoT expertise necessary',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="eng">
      <body>
        <ToastProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ToastProvider>
      </body>
      <GoogleTagManager gtmId="GTM-WMV2CG37" />

    

    </html>
  );
}
