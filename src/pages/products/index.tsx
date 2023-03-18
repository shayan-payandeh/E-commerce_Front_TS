import ProductService from '@/service/productService';
import { ICartItems } from '@/utils/interface/cartItems';
import { IData } from '@/utils/interface/data';
import { IProduct } from '@/utils/interface/product';
import pageNumberLabel from '@/utils/pageNumberLabel';
import routerPush from '@/utils/routerPush';
import { AppCtxt } from '@/utils/Store';
import {
  Grid,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/Products.module.scss';
import ProductCard from '@/components/card/ProductCard';
import { motion } from 'framer-motion';
import categoryService from '@/service/categoryService';
import brandService from '@/service/brandService';
import { ICategory } from '@/utils/interface/category';
import { IBrand } from '@/utils/interface/brand';
import FilterSection from '@/components/FilterSection';
import FilterSectionMobile from '@/components/FilterSectionMobile';

type HomeProps = {
  productsInit: IData<IProduct>;
  categoriesInit: IData<ICategory>;
  brandsInit: IData<IBrand>;
};

function Products({ productsInit, categoriesInit, brandsInit }: HomeProps) {
  const [products, setProducts] = useState<IProduct[]>(productsInit.docs);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [language, setLanguage] = useState<string | undefined>('');
  const { state, dispatch } = useContext(AppCtxt);
  const cartItems: ICartItems[] = state.cart?.cartItems as ICartItems[];
  const productCategories = {
    slug: categoriesInit.docs.map((category) => category.name),
  };
  const productBrands = { brand: brandsInit.docs.map((brand) => brand.name) };

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  useEffect(() => {
    setProducts(productsInit.docs);
  }, [router]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const filterHandler = (value: string, checked: boolean, typeName: string) => {
    const x = router.query[typeName] as string;
    if (checked) {
      router.query[typeName] =
        router.query[typeName] && typeName !== 'price'
          ? x.concat(',', value)
          : value;
      routerPush(router);
    } else {
      const string = router.query[typeName] as string;
      const array = string.split(',');
      for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
          array.splice(i, 1);
        }
      }
      const x = array.join();
      if (x.length > 0) {
        router.query[typeName] = x;
      } else delete router.query[typeName];
      routerPush(router);
    }
  };

  const pageHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 0);
    router.query.page = value.toString();
    routerPush(router);
  };

  const addToCartHandler = (product: IProduct, number: number) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + number : 1;
    if (product.countInStock < quantity && quantity > 0) {
      closeSnackbar();
      const errorMessage =
        language === 'English'
          ? 'Sorry. Product is out of stock'
          : 'محصول مورد نظر با این تعداد موجود نیست';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    } else if (quantity === 0) {
      return dispatch({ type: 'CART_REMOVE_ITEM', payload: product });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const pageNumberLabelHandle = (item: PaginationRenderItemParams) => {
    const pageNumber = pageNumberLabel(item, language);
    return pageNumber;
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        direction={language === 'English' ? 'row' : 'row-reverse'}
        style={{ padding: '0px', marginTop: '20px' }}
      >
        <Grid item xs={12} md={3}>
          <FilterSection
            productTypes={productCategories}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSection
            productTypes={productBrands}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
          {/* <SliderFilterSection /> */}
          <FilterSectionMobile
            productTypes={productCategories}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSectionMobile
            productTypes={productBrands}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
          {/* <SliderFilterSectionMobile /> */}
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          direction={language === 'English' ? 'row-reverse' : 'row'}
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
              key={product.name}
              component={motion.div}
              variants={item}
            >
              <ProductCard
                product={product}
                language={language}
                addToCartHandler={addToCartHandler}
                cartItems={cartItems}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br /> <br />
      <Pagination
        page={productsInit.page}
        size="large"
        className={styles.pagination}
        count={productsInit.totalPages}
        variant="outlined"
        sx={{
          '& .Mui-selected': {
            borderColor: styles.primary,
            backgroundColor: styles.lightPrimary,
          },
        }}
        onChange={pageHandler}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} page={pageNumberLabelHandle(item)} />
        )}
      />
    </>
  );
}

export default Products;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productsResult = await ProductService.getAll(context.query);
  const products =
    productsResult instanceof Error ? { docs: [] } : productsResult?.data.data;

  const categoriesResult = await categoryService.getAll();
  const categories =
    categoriesResult instanceof Error
      ? { docs: [] }
      : categoriesResult?.data.data;
  const brandsResult = await brandService.getAll();
  const brands =
    brandsResult instanceof Error ? { docs: [] } : brandsResult?.data.data;
  return {
    props: {
      productsInit: products,
      categoriesInit: categories,
      brandsInit: brands,
    },
  };
};
