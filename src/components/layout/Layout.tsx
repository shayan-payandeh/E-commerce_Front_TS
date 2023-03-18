import { AppCtxt } from '@/utils/Store';
import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import AppbarMenu from './AppbarMenu';
import AppbarMenuMobile from './AppbarMenuMobile';
import Footer from './footer/Footer';
import MainAppbar from './MainAppbar';
import styles from '@/styles/component/Layout.module.scss';
import dynamic from 'next/dynamic';

function Layout({ children }: { children: any }) {
  const { state, dispatch } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);
  return (
    <div>
      <Head>
        <title>
          {language === 'English' ? 'Shayan E-Commerce' : 'فروشگاه شایان'}
        </title>
        <meta
          name="description"
          content="nextjs e-commerce onlineshop application"
        />
      </Head>
      <MainAppbar />
      <AppbarMenu />
      <AppbarMenuMobile />
      <Container className={styles.main}>{children}</Container>
      <Footer />
    </div>
  );
}

export default dynamic(Promise.resolve(Layout), { ssr: false });
