import Layout from '@/components/layout/Layout';
import { StoreProvider } from '@/utils/Store';
import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SnackbarProvider>
  );
}
