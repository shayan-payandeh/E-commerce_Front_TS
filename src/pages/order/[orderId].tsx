import { useRouter } from 'next/router';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useContext, useEffect, useState } from 'react';
import OrderSummary from '@/components/order/OrderSummary';
import ShippingAddressCard from '@/components/card/ShippingAddressCard';
import PaymentMethodCard from '@/components/card/PaymentMethodCard';
import OrderItemsCard from '@/components/order/OrderItemsCard';
import { Grid } from '@mui/material';
import OrderCodeCard from '@/components/order/OrderCodeCard';
import { GetServerSideProps } from 'next';
import { AppCtxt } from '@/utils/Store';
import { IOrder } from '@/utils/interface/order';
import { url } from '@/utils/values';
import orderService from '@/service/orderService';
import { IOrderItems } from '@/utils/interface/orderIItems';

type HomeProps = {
  order: IOrder;
};

function OrderScreen({ order }: HomeProps) {
  const [language, setLanguage] = useState<string | undefined>('');
  const { state } = useContext(AppCtxt);
  const { userInfo } = state;
  const router = useRouter();
  const totalItems = order.orderItems?.reduce((a, c) => c.quantity + a, 0);
  const totalItemsPrice = order.orderItems?.reduce(
    (a, c) => c.quantity * c.price + a,
    0
  );

  useEffect(() => {
    setLanguage(state.language);
    if (!userInfo) {
      router.push(`${url.loginUrl}`);
    }
  }, []);

  return (
    <>
      <CheckoutWizard activeStep={4} language={language} />
      <Grid
        style={{ marginTop: '35px' }}
        container
        spacing={2}
        direction={language === 'English' ? 'row' : 'row-reverse'}
      >
        <Grid item md={9} xs={12}>
          <OrderCodeCard order={order} language={language} />
          <ShippingAddressCard order={order} language={language} />
          <PaymentMethodCard order={order} language={language} />
          <OrderItemsCard
            orders={order.orderItems as IOrderItems[]}
            language={language}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <OrderSummary
            language={language}
            totalItems={totalItems as number}
            totalItemsPrice={totalItemsPrice as number}
            shippingPrice={order.shippingPrice as number}
            tax={order.tax as number}
            totalPrice={order.totalPrice as number}
            buttonFlag={false}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderScreen;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let result: undefined | IOrder | {};
  if (context.req.cookies?.userInfo) {
    const token: string = JSON.parse(context.req.cookies.userInfo).token;
    const orderId = context.params?.orderId as string;
    const response = await orderService.getTheOrder(orderId, token);
    result = response instanceof Error ? {} : response?.data;
  }
  return { props: { order: result } };
};
