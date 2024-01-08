// app/_app.tsx
import '../styles/globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  )
}

export default MyApp
