import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import OrderSummary from '@/components/order/OrderSummary';
import OrderItemsCard from '@/components/order/OrderItemsCard';
import PaymentMethodCard from '@/components/card/PaymentMethodCard';
import ShippingAddressCard from '@/components/card/ShippingAddressCard';
import { Grid } from '@mui/material';
import styles from '@/styles/PlaceOrder.module.scss';
import dynamic from 'next/dynamic';
import { AppCtxt, CartType } from '@/utils/Store';
import { url } from '@/utils/values';
import getError from '@/utils/getError';
import OrderService from '@/service/orderService';
import { ICartItems } from '@/utils/interface/cartItems';

const PlaceOrder = () => {
  const [language, setLanguage] = useState<string | undefined>('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(AppCtxt);
  //   const cartItems = state.cart?.cartItems
  const { shippingAddress, paymentMethod, cartItems } = state?.cart as CartType;
  const totalItems = cartItems?.reduce((a, c) => c.quantity + a, 0);
  const initialTotalItemsPrice = cartItems?.reduce(
    (a, c) => c.quantity * c.price + a,
    0
  );
  const totalItemsPrice = initialTotalItemsPrice as number;
  const tax = Math.round(Math.ceil(totalItemsPrice * 0.05) / 1000) * 1000;
  const shippingPrice = totalItemsPrice > 200000 ? 0 : 15000;
  const totalPrice = totalItemsPrice + tax + shippingPrice;

  useEffect(() => {
    setLanguage(state.language);
    if (!paymentMethod) {
      router.push(`${url.paymentUrl}`);
    }
    if (cartItems?.length === 0) {
      router.push(`${url.cartUrl}`);
    }
  }, []);

  const placeOrderHandler = async () => {
    closeSnackbar();
    setLoading(true);
    const token = state.userInfo?.token as string;
    const response = await OrderService.addOrder(
      {
        orderItems: cartItems as ICartItems[],
        shippingAddress,
        paymentMethod,
        totalItemsPrice,
        shippingPrice,
        tax,
        totalPrice,
      },
      token
    );
    console.log(response);
    if (response instanceof Error) {
      enqueueSnackbar(getError(response, language as string), {
        variant: 'error',
      });
      setLoading(false);
    } else if (typeof response !== 'undefined') {
      router.push(`${url.ordersUrl}/${response?.data._id}`);
      dispatch({ type: 'CART_CLEAR', payload: '' });
      setLoading(false);
    }
  };

  return (
    <>
      <CheckoutWizard activeStep={3} language={language} />
      <span
        className={
          language === 'English' ? styles.englishTitle : styles.persianTitle
        }
      >
        {language === 'English' ? 'Place Order' : 'ثبت سفارش'}
      </span>

      {cartItems?.length !== 0 && (
        <Grid
          style={{ marginTop: '20px' }}
          container
          spacing={2}
          direction={language === 'English' ? 'row' : 'row-reverse'}
        >
          <Grid item md={9} xs={12}>
            <ShippingAddressCard
              language={language}
              order={state.cart as CartType}
            />
            <PaymentMethodCard
              order={state.cart as CartType}
              language={language}
            />
            <OrderItemsCard
              orders={cartItems as ICartItems[]}
              language={language}
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <OrderSummary
              language={language}
              totalItems={totalItems as number}
              totalItemsPrice={totalItemsPrice}
              shippingPrice={shippingPrice}
              tax={tax}
              totalPrice={totalPrice}
              buttonFlag={false}
              button={true}
              loading={loading}
              placeOrderHandler={placeOrderHandler}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
