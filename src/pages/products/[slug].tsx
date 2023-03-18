import { IProduct } from '@/utils/interface/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import ProductService from '@/service/productService';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import priceConvetor from '@/utils/priceConvertor';
import { priceUnit, url } from '@/utils/values';
import { AppCtxt } from '@/utils/Store';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { ICartItems } from '@/utils/interface/cartItems';
import styles from '@/styles/ProductSlug.module.scss';
import fakePrice from '@/utils/fakePrice';
import AppBreadcrumb from '@/components/AppBreadcrumb';

type HomeProps = {
  product: IProduct;
};
const ProductScreen = ({ product }: HomeProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const array = [{ name: 'products', link: '/products' }];
  const persianArray = [{ name: 'محصولات', link: '/products' }];
  const currentPage = router.query.slug;
  const { state, dispatch } = useContext(AppCtxt);
  const cartItems = state.cart?.cartItems as ICartItems[];
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const addToCartHandler = () => {
    closeSnackbar();
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > product.countInStock) {
      closeSnackbar();
      const errorMessage =
        language === 'English'
          ? 'Sorry. Product is out of stock'
          : 'محصول مورد نظر با این تعداد موجود نیست';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push(`${url.cartUrl}`);
  };

  if (router.isFallback) return <div>loading ...</div>;
  return (
    <>
      <AppBreadcrumb
        array={language === 'English' ? array : persianArray}
        currentPage={currentPage}
      />
      <Grid
        container
        spacing={2}
        direction={language === 'English' ? 'row' : 'row-reverse'}
        className={styles.container}
      >
        <Grid item md={6} xs={12}>
          <Box className={styles.imageBox}>
            <Image
              src={product.image}
              width={470}
              height={470}
              alt={product.name}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            className={styles.infoBox}
            dir={language === 'English' ? 'ltr' : 'rtl'}
          >
            <List>
              <ListItem className={styles.listItem}>
                <Typography className={styles.text}>
                  <strong>{product.name}</strong>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemFirst}>
                <Typography className={styles.text}>
                  <em>{product.description}</em>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemSecond}>
                <Rating value={3} name="rating" />
              </ListItem>
              <ListItem className={styles.listItemThird}>
                <Typography
                  className={
                    language === 'English'
                      ? styles.englishText
                      : styles.persianText
                  }
                >
                  <span>
                    {language === 'English'
                      ? `$${product.price / 1000}.00`
                      : `${priceConvetor(product.price)}${priceUnit}`}
                  </span>
                </Typography>
                &nbsp; &nbsp;
                <Typography className={styles.textThrough}>
                  <span>
                    {language === 'English'
                      ? `$${
                          product.price / 1000 +
                          Math.ceil(product.price / 1000 / 3)
                        }.00`
                      : ` ${priceConvetor(
                          fakePrice(product.price)
                        )} ${priceUnit}`}
                  </span>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemForth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Brand :' : 'برند :'} &nbsp;
                </Typography>
                <Typography>{product.brand.name}</Typography>
              </ListItem>
              <ListItem className={styles.listItemFifth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Category :' : 'دسته :'} &nbsp;
                </Typography>
                <Typography>{product.category.name}</Typography>
              </ListItem>
              <ListItem className={styles.listItemFifth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Availablity :' : 'وضعیت :'} &nbsp;
                </Typography>
                <Typography>
                  {language === 'English'
                    ? product.countInStock > 0
                      ? 'In Stock'
                      : 'Out of Stock'
                    : product.countInStock > 0
                    ? 'موجود'
                    : 'ناموجود'}
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemSixth}>
                <Button onClick={addToCartHandler} className={styles.addButton}>
                  {language === 'English'
                    ? 'Add To Cart'
                    : 'افزودن به سبد خرید '}
                </Button>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductScreen;

export const getStaticPaths: GetStaticPaths = async () => {
  const productsResult = await ProductService.getAll('');
  let products: IProduct[] = [];
  if (productsResult instanceof Error) {
  } else if (typeof productsResult !== 'undefined') {
    products = productsResult?.data?.data?.docs;
  }

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const response = await ProductService.getOne(slug);
  let result: IProduct | {} | undefined;
  result = response instanceof Error ? {} : response?.data;
  return {
    props: {
      product: result,
    },
  };
};
