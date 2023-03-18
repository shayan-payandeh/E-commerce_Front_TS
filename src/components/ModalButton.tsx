import { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AppCtxt } from '@/utils/Store';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { LocalShippingOutlined } from '@mui/icons-material';
import styles from '@/styles/component/ModalButton.module.scss';
import { IOrder } from '@/utils/interface/order';
import toPersianNumber from '@/utils/persianNumber';

type HomeProps = {
  order: IOrder;
};

function ModalButton({ order }: HomeProps) {
  const [language, setLanguage] = useState<string | undefined>('');
  const { state } = useContext(AppCtxt);
  const { shippingAddress, isDelievered } = order;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        style={{ textTransform: 'none' }}
        size="small"
      >
        <LocalShippingOutlined style={{ color: styles.primary }} />
      </Button>
      <ReactModal
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        isOpen={open}
        closeTimeoutMS={500}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            padding: '20px',
            border: 'none',
          },
        }}
      >
        <Box className={styles.modalBox}>
          <Box
            style={{
              textAlign: 'center',
              backgroundColor: styles.primary,
              color: 'white',
              padding: '20px ',
            }}
          >
            <Typography variant="h6" style={{ fontSize: '16px' }}>
              {language === 'English' ? 'Shipping Address' : 'آدرس '}
            </Typography>
          </Box>
          {language === 'English' && (
            <List>
              <ListItem>
                <Typography id="modal-modal-title">
                  <strong>Name:</strong>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography id="modal-modal-description">
                  {shippingAddress['fullname']}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography id="modal-modal-title">
                  <strong>Address:</strong>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography id="modal-modal-description">
                  {shippingAddress['postalCode']},{shippingAddress['address']},
                  {shippingAddress['city']},{shippingAddress['country']}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography id="modal-modal-title">
                  <strong>Status:</strong>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography id="modal-modal-description">
                  {isDelievered ? 'Delivered' : 'Not delivered'}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  style={
                    language === 'English'
                      ? {
                          marginLeft: 'auto',
                          marginRight: 0,
                          backgroundColor: styles.primary,
                          color: 'white',
                        }
                      : {
                          marginRight: 'auto',
                          marginLeft: 0,
                          backgroundColor: styles.primary,
                          color: 'white',
                          fontSize: '14px',
                        }
                  }
                >
                  {language === 'English' ? 'Ok' : 'خروج'}
                </Button>
              </ListItem>
            </List>
          )}
          {language !== 'English' && (
            <List>
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  <strong>{': نام'}</strong>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  {shippingAddress['fullname']}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  <strong>{': آدرس'}</strong>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  {shippingAddress['country']} - {shippingAddress['city']}
                </span>
              </ListItem>
              <ListItem
                style={{
                  textAlign: 'end',
                  marginRight: 0,
                  marginLeft: 'auto',
                  fontSize: '13px',
                }}
              >
                <span>
                  {shippingAddress['address']} - {'کدپستی :'}{' '}
                  {language === 'English'
                    ? shippingAddress['postalCode']
                    : toPersianNumber(shippingAddress['postalCode'])}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  <strong>{': وضعیت سفارش'}</strong>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '13px',
                  }}
                >
                  {isDelievered ? 'تحویل داده شده' : 'در حال بررسی'}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  style={
                    language === 'English'
                      ? {
                          marginLeft: 'auto',
                          marginRight: 0,
                          backgroundColor: styles.primary,
                          color: 'white',
                        }
                      : {
                          marginRight: 'auto',
                          marginLeft: 0,
                          backgroundColor: styles.primary,
                          color: 'white',
                          fontSize: '14px',
                        }
                  }
                >
                  {language === 'English' ? 'Ok' : 'خروج'}
                </Button>
              </ListItem>
            </List>
          )}
        </Box>
      </ReactModal>
    </>
  );
}

export default ModalButton;
