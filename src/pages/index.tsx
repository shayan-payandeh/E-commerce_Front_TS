import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/Home.module.scss';
import { AppCtxt } from '@/utils/Store';
import { Grid, Box } from '@mui/material';
import { GetStaticProps } from 'next';
import ProductService from '@/service/productService';
import newestProducts from '@/utils/limitedProducts';
import NextLink from 'next/link';
import { url } from '@/utils/values';
import Image from 'next/image';
import shirtModel1 from '@/assets/images/shirtModel1.jpg';
import pantsModel2 from '@/assets/images/pantsModel2.jpg';
import zaraBrand from '@/assets/images/zaraBrand.jpg';
import raymondBrand from '@/assets/images/raymondBrand.jpg';
import SlideShow from '@/components/SlideShow';
import CardSlider from '@/components/card/CardSlider';
import { IProduct } from '@/utils/interface/product';
import { IData } from '@/utils/interface/data';

type HomeProps = {
  allProducts: IData<IProduct>;
  bestSelling: IProduct[];
};

function Home({ allProducts, bestSelling }: HomeProps) {
  const { state, dispatch } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');
  const [newProducts, setNewProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setLanguage(state.language);
    const earliestProducts = newestProducts(allProducts.docs);
    setNewProducts(earliestProducts);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container md={4} xs={12} spacing={1}>
          <Grid item md={12} xs={12}>
            <NextLink href={`${url.productsUrl}?slug=Shirts`} passHref>
              <div
                style={{ marginTop: '40px' }}
                className={styles.categoryContainer}
              >
                <Image
                  height={330}
                  width={610}
                  alt="shirts"
                  className={styles.categoryImage}
                  src={shirtModel1}
                />
              </div>
            </NextLink>
          </Grid>
          <Grid item md={12} xs={12}>
            <NextLink href={`${url.productsUrl}?slug=Pants`} passHref>
              <div className={styles.categoryContainer}>
                <Image
                  height={330}
                  width={610}
                  alt="pants"
                  className={styles.categoryImage}
                  src={pantsModel2}
                />
              </div>
            </NextLink>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <SlideShow />
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        <Grid item md={6} xs={12}>
          <NextLink href={`${url.productsUrl}?brand=Raymond`} passHref>
            <Box className={styles.categoryContainer}>
              <Image
                className={styles.categoryImage}
                src={raymondBrand}
                alt="shirts"
                width={610}
                height={284}
              />
            </Box>
          </NextLink>
        </Grid>
        <Grid item md={6} xs={12}>
          <NextLink href={`${url.productsUrl}?brand=Zara`} passHref>
            <Box className={styles.categoryContainer}>
              <Image
                className={styles.categoryImage}
                src={zaraBrand}
                alt="pants"
                layout="responsive"
                width={610}
                height={284}
              />
            </Box>
          </NextLink>
        </Grid>
      </Grid>
      <CardSlider
        products={newProducts}
        title={language === 'English' ? 'Newest' : 'جدیدترین ها'}
      />
      <CardSlider
        products={bestSelling}
        title={language === 'English' ? 'Best Seller' : 'پرفروش ترین ها'}
      />
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const productsResult = await ProductService.getAll('');
  const products =
    productsResult instanceof Error ? { docs: [] } : productsResult?.data.data;
  const bestsellResult = await ProductService.getBestSelling();
  const bestsell = bestsellResult instanceof Error ? [] : bestsellResult?.data;
  return {
    props: {
      allProducts: products,
      bestSelling: bestsell,
    },
  };
};
