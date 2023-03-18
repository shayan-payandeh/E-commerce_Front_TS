import { AppCtxt } from '@/utils/Store';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/OrderHistoryTable.module.scss';
import { priceUnit, url } from '@/utils/values';
import priceConvetor from '@/utils/priceConvertor';
import NextLink from 'next/link';
import ModalButton from '../ModalButton';
import { IOrder } from '@/utils/interface/order';

type HomeProps = {
  dateFlag: 'desc' | 'asc';
  totalPriceFlag: 'desc' | 'asc';
  dateSortHandler: () => void;
  totalPriceSortHandler: () => void;
  orders: IOrder[];
};

const OrderHistoryTable = ({
  dateFlag,
  totalPriceFlag,
  dateSortHandler,
  totalPriceSortHandler,
  orders,
}: HomeProps) => {
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  return (
    <>
      <TableContainer>
        <Table
          className={styles.table}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <TableHead className={styles.TableHead}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'ID' : 'شناسه'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'DATE' : 'تاریخ'}</strong>
                <TableSortLabel
                  active
                  direction={dateFlag}
                  onClick={dateSortHandler}
                />
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'Total' : 'مبلغ'}</strong>
                <TableSortLabel
                  active
                  direction={totalPriceFlag}
                  onClick={totalPriceSortHandler}
                />
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>
                  {language === 'English' ? 'PAID' : 'وضعیت پرداخت'}
                </strong>
              </TableCell>
              <TableCell
                className={styles.tableHeaderCell}
                align="center"
              ></TableCell>
              <TableCell
                className={styles.tableHeaderCell}
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className={styles.tableBodyCell} align="center">
                  {order._id?.substring(20, 24)}
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? order.createdAt
                      : order.persianCreatedAt}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? `$${order.totalPrice}`
                      : `${priceConvetor(
                          order.totalPrice as number
                        )}${priceUnit}`}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? order.isPaid
                        ? `paid at`
                        : 'not paid'
                      : order.isPaid
                      ? `پرداخت شده`
                      : 'عدم پرداخت'}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <NextLink href={`${url.ordersUrl}/${order._id}`} passHref>
                    <Button className={styles.detailButton} variant="contained">
                      <span>
                        {language === 'English' ? 'Details' : 'جزئیات'}
                      </span>
                    </Button>
                  </NextLink>
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  <ModalButton order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderHistoryTable;
