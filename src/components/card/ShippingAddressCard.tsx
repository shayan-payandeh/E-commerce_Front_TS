import styles from '@/styles/component/ShippingAddressCard.module.scss';
import { IOrder } from '@/utils/interface/order';
import toPersianNumber from '@/utils/persianNumber';
import { Card, List, ListItem, Typography } from '@mui/material';

type HomeProps = {
  order: IOrder;
  language: string | undefined;
};

function ShippingAddressCard({ order, language }: HomeProps) {
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
                {language === 'English' ? 'Shipping Address' : ' آدرس پستی'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              {order.shippingAddress.city}
              {' - '}
              {order.shippingAddress.address}
              {' - '}
              {language === 'English'
                ? order.shippingAddress.postalCode
                : toPersianNumber(order.shippingAddress.postalCode)._str}
            </Typography>
          </ListItem>

          <ListItem>
            {language === 'English' && (
              <Typography>
                Status: {order.isDelievered ? 'delivered' : 'not delivered'}
              </Typography>
            )}
            {language !== 'English' && (
              <Typography>
                <span style={{ fontSize: '14px' }}>{'   وضعیت سفارش:'}</span>
                <span style={{ fontSize: '14px' }}>
                  &nbsp;
                  {order.isDelievered ? 'تحویل داده شده' : 'در حال بررسی'}
                </span>
              </Typography>
            )}
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default ShippingAddressCard;
