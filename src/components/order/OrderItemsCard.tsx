import NextLink from 'next/link';
import Image from 'next/image';
import {
  Card,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import styles from '@/styles/component/OrderItemsCard.module.scss';
import priceConvertor from '@/utils/priceConvertor';
import { priceUnit, url } from '@/utils/values';
import { IOrderItems } from '@/utils/interface/orderIItems';
import toPersianNumber from '@/utils/persianNumber';

type HomeProps = {
  orders: IOrderItems[];
  language: string | undefined;
};

function OrderItemsCard({ orders, language }: HomeProps) {
  return (
    <>
      <Card
        className={styles.section}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <List>
          <ListItem>
            <Typography>
              <strong>
                {language === 'English' ? 'Order Items' : 'آیتم های خرید'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <TableContainer>
              <Table dir={language === 'English' ? 'ltr' : 'rtl'}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <span>{language === 'English' ? 'Image' : 'تصویر'}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{language === 'English' ? 'Name' : 'نام'}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        {language === 'English' ? 'Quantity' : 'تعداد'}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{language === 'English' ? 'Price' : 'قیمت'}</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell align="center">
                        <NextLink
                          href={`${url.productsUrl}/${item.name
                            .toLowerCase()
                            .replace(' ', '-')}`}
                          passHref
                        >
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={45}
                              height={45}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="center">
                        <NextLink
                          href={`${url.productsUrl}/${item.name
                            .toLowerCase()
                            .replace(' ', '-')}`}
                          passHref
                        >
                          <Link>{item.name}</Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="center">
                        <span>
                          {language === 'English'
                            ? item.quantity
                            : toPersianNumber(item.quantity)}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>
                          {language === 'English'
                            ? `$
                            ${item.price}`
                            : `${priceConvertor(item.price)}
                            ${priceUnit}`}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default OrderItemsCard;
