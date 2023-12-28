import ReactQueryProvider from '@/providers/ReactQueryProvider';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: 'askIoT - Your AI Powered IoT Copilot',
  description:
    'Ditch the hassle and complexity of navigating through the fragmented IoT ecosystem . Let askIoT build it for you. No IoT expertise necessary',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="eng">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastContainer
          position="top-right"
          hideProgressBar
          autoClose={5000}
          closeOnClick
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </body>
    </html>
  );
}
