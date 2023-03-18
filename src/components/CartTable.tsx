import { Delete } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import priceConvetor from '@/utils/priceConvertor';
import { priceUnit, url } from '@/utils/values';
import styles from '@/styles/component/ShippingCartTable.module.scss';
import toPersianNumber from '@/utils/persianNumber';
import { ICartItems } from '@/utils/interface/cartItems';

type HomeProps = {
  language: string | undefined;
  cartItems: ICartItems[];
  updateCartHandler: (item: ICartItems, number: 1 | -1) => void;
  removeCartHandler: (item: ICartItems) => void;
};

function CartTable({
  language,
  cartItems,
  updateCartHandler,
  removeCartHandler,
}: HomeProps) {
  return (
    <>
      <TableContainer>
        <Table
          className={styles.table}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>
                <strong>{language === 'English' ? 'Image' : 'تصویر'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <strong>{language === 'English' ? 'Name' : 'نام'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'Quantity' : 'تعداد'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'Price' : 'فی'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'Total' : 'کل'}</strong>
              </TableCell>
              <TableCell
                className={styles.tableHeaderCell}
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {cartItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">
                  <NextLink href={`${url.productsUrl}/${item.slug}`} passHref>
                    <Link>
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={50}
                        width={50}
                      />
                    </Link>
                  </NextLink>
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  <NextLink href={`${url.productsUrl}/${item.slug}`} passHref>
                    <Link>{item.name}</Link>
                  </NextLink>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <Button onClick={() => updateCartHandler(item, -1)}>-</Button>

                  <TextField
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        width: '12px',
                      },
                    }}
                    variant="outlined"
                    size="small"
                    value={
                      language === 'English'
                        ? item.quantity
                        : toPersianNumber(item.quantity)
                    }
                  />
                  <Button onClick={() => updateCartHandler(item, 1)}>+</Button>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? `$${item.price}`
                      : `${priceConvetor(item.price)}${priceUnit}`}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? `$${item.quantity * item.price}`
                      : `${priceConvetor(
                          item.quantity * item.price
                        )}${priceUnit}`}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeCartHandler(item)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CartTable;
