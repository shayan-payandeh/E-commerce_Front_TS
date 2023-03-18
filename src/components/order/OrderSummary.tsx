import {
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import priceConvetor from '@/utils/priceConvertor';
import { priceUnit } from '@/utils/values';
import styles from '@/styles/component/OrderSummary.module.scss';
import toPersianNumber from '@/utils/persianNumber';

type HomeProps = {
  language: string | undefined;
  totalItems: number;
  totalItemsPrice: number;
  shippingPrice: number;
  tax: number;
  totalPrice: number;
  buttonFlag: boolean;
  checkOutHandler?: () => void;
  button?: boolean;
  placeOrderHandler?: () => void;
  loading?: boolean;
};

function OrderSummary({
  language,
  totalItems,
  totalItemsPrice,
  shippingPrice,
  tax,
  totalPrice,
  buttonFlag,
  checkOutHandler,
  button,
  placeOrderHandler,
  loading,
}: HomeProps) {
  return (
    <>
      <Card
        className={styles.orderSummaryCard}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <List>
          <ListItem style={{ justifyContent: 'center' }}>
            <Typography variant="h6">
              <span>
                <strong>
                  {language === 'English' ? 'Order Summary' : 'خلاصه سفارش'}
                </strong>
              </span>
            </Typography>
          </ListItem>
          <ListItem>
            <Divider style={{ backgroundColor: 'black', width: '100%' }} />
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span style={{ fontSize: '15px' }}>
                    {language === 'English' ? 'Items:' : 'اقلام : '}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'right' : 'left'}>
                  <span style={{ fontSize: '14px' }}>
                    {language === 'English'
                      ? totalItems
                      : toPersianNumber(totalItems) + ' مورد'}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span style={{ fontSize: '15px' }}>
                    {language === 'English' ? 'Price:' : 'قیمت : '}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'right' : 'left'}>
                  <span style={{ fontSize: '14px' }}>
                    {language === 'English'
                      ? ` $${totalItemsPrice}`
                      : priceConvetor(totalItemsPrice) + ` ${priceUnit}`}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Divider style={{ backgroundColor: '#cfcfcf', width: '100%' }} />
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span style={{ fontSize: '15px' }}>
                    {language === 'English' ? 'Shipping:' : 'کرایه : '}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'right' : 'left'}>
                  <span style={{ fontSize: '14px' }}>
                    {language === 'English'
                      ? ` $${shippingPrice}`
                      : shippingPrice > 0
                      ? priceConvetor(shippingPrice) + ` ${priceUnit}`
                      : '-'}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span style={{ fontSize: '15px' }}>
                    {language === 'English' ? 'Tax:' : 'مالیات : '}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'right' : 'left'}>
                  <span style={{ fontSize: '14px' }}>
                    {language === 'English'
                      ? ` $${tax}`
                      : priceConvetor(tax) + ` ${priceUnit}`}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Divider style={{ backgroundColor: '#cfcfcf', width: '100%' }} />
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span style={{ fontSize: '15px' }}>
                    <strong>
                      {language === 'English' ? 'Total cost:' : 'جمع کل: '}
                    </strong>
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  align={language === 'English' ? 'right' : 'left'}
                  color="error"
                >
                  <span style={{ fontSize: '15px' }}>
                    <strong>
                      {language === 'English'
                        ? ` $${totalPrice}`
                        : priceConvetor(totalPrice) + ` ${priceUnit}`}
                    </strong>
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          {buttonFlag && (
            <ListItem>
              <Button
                onClick={checkOutHandler}
                variant="contained"
                className={styles.placeOrderButton}
                fullWidth
              >
                <span>
                  <strong>
                    {language === 'English' ? 'Check out' : 'ادامه'}
                  </strong>
                </span>
              </Button>
            </ListItem>
          )}
          {button && (
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                onClick={placeOrderHandler}
                className={styles.placeOrderButton}
              >
                <span>
                  {language === 'English' ? 'Place Order' : 'نهایی کردن خرید'}
                </span>
              </Button>
            </ListItem>
          )}
          {loading && (
            <ListItem>
              <CircularProgress />
            </ListItem>
          )}
        </List>
      </Card>
    </>
  );
}

export default OrderSummary;
