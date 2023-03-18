import styles from '@/styles/component/ShippingAddressCard.module.scss';
import { IOrder } from '@/utils/interface/order';
import { Card, List, ListItem, Typography } from '@mui/material';

type HomeProps = {
  order: IOrder;
  language: string | undefined;
};

function OrderCodeCard({ order, language }: HomeProps) {
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
                {language === 'English' ? 'Order ID' : 'کد پیگیری سفارش'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <span> {order._id}</span> &nbsp;
            </Typography>
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default OrderCodeCard;
