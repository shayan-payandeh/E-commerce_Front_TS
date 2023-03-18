import ProfileAndHistory from '@/components/ProfileAndHistory';
import OrderService from '@/service/orderService';
import pageNumberLabel from '@/utils/pageNumberLabel';
import routerPush from '@/utils/routerPush';
import { AppCtxt } from '@/utils/Store';
import { url } from '@/utils/values';
import {
  Box,
  Grid,
  List,
  ListItem,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/OrderHistory.module.scss';
import OrderHistoryTable from '@/components/order/OrderHistoryTable';
import { IData } from '@/utils/interface/data';
import { IOrder } from '@/utils/interface/order';
import { IAPiResponse } from '@/utils/interface/apiResponse';

type HomeProps = {
  ordersInit: IData<IOrder>;
};

function OrderHistory({ ordersInit }: HomeProps) {
  const theOrders = ordersInit.docs;
  const [language, setLanguage] = useState<string | undefined>('');
  const [orders, setOrders] = useState<IOrder[]>(theOrders);
  const [totalPriceFlag, setTotalPriceFlag] = useState<'desc' | 'asc'>('asc');
  const [dateFlag, setDateFlag] = useState<'desc' | 'asc'>('asc');
  const { state } = useContext(AppCtxt);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  useEffect(() => {
    setOrders(theOrders);
  }, [theOrders]);

  const dateSortHandler = () => {
    const sortValue = router.query.sort;
    window.scrollTo(0, 0);
    router.query.sort = sortValue === 'newest' ? 'oldest' : 'newest';
    sortValue === 'newest' ? setDateFlag('asc') : setDateFlag('desc');
    routerPush(router);
  };

  const totalPriceSortHandler = () => {
    const sortValue = router.query.sort;
    window.scrollTo(0, 0);
    router.query.sort = sortValue === 'cheaper' ? 'expensive' : 'cheaper';
    sortValue === 'expensive'
      ? setTotalPriceFlag('asc')
      : setTotalPriceFlag('desc');
    routerPush(router);
  };

  const pageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 0);
    router.query.page = value.toString();
    routerPush(router);
  };

  const pageNumberLabelHandle = (item: any) => {
    const pageNumber = pageNumberLabel(item, language);
    return pageNumber;
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        direction={language === 'English' ? 'row' : 'row-reverse'}
      >
        <Grid item md={3} xs={12}>
          <ProfileAndHistory pathname={pathname} />
        </Grid>
        <Grid item md={9} xs={12}>
          <Box className={styles.historyContainer}>
            <List>
              <ListItem>
                <span
                  className={
                    language === 'English'
                      ? styles.englishTitle
                      : styles.persianTitle
                  }
                >
                  {language === 'English' ? 'Order History' : 'لیست سفارشات '}
                </span>
              </ListItem>
              <ListItem>
                <OrderHistoryTable
                  orders={orders}
                  dateSortHandler={dateSortHandler}
                  totalPriceSortHandler={totalPriceSortHandler}
                  dateFlag={dateFlag}
                  totalPriceFlag={totalPriceFlag}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
      <Pagination
        page={ordersInit.page}
        size="large"
        className={styles.pagination}
        count={ordersInit.totalPages}
        variant="outlined"
        onChange={pageHandler}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} page={pageNumberLabelHandle(item)} />
        )}
      />
    </>
  );
}

export default OrderHistory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let ordersResult;
  let result: undefined | IAPiResponse<IOrder[]> | never[] | { docs: [] };
  if (context.req.cookies?.userInfo) {
    const token: string = JSON.parse(context.req.cookies.userInfo).token;
    ordersResult = await OrderService.getMyOrders(context.query, token);
    result = ordersResult instanceof Error ? { docs: [] } : ordersResult?.data;
  } else {
    return {
      redirect: {
        destination: `${url.loginUrl}?redirect=${url.orderHistoryUrl}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ordersInit: result,
    },
  };
};
