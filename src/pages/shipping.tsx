import CheckoutWizard from '@/components/CheckoutWizard';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AppCtxt } from '@/utils/Store';
import { url } from '@/utils/values';
import { IShippingAddress } from '@/utils/interface/shippingAddress';
import styles from '@/styles/Shipping.module.scss';

const Shipping = () => {
  const [language, setLanguage] = useState<string | undefined>('');
  const router = useRouter();
  const { state, dispatch } = useContext(AppCtxt);
  const { userInfo, cart } = state;
  const shippingAddress = cart?.shippingAddress;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IShippingAddress>();

  useEffect(() => {
    setLanguage(state.language);
    if (!userInfo) {
      router.push(`${url.loginUrl}?redirect=${url.shippingUrl}`);
    }
    if (cart?.cartItems?.length === 0) {
      router.push(`${url.productsUrl}`);
      return;
    }
    setValue('fullname', shippingAddress?.fullname as string);
    setValue('address', shippingAddress?.address as string);
    setValue('city', shippingAddress?.city as string);
    setValue('country', shippingAddress?.country as string);
    setValue('postalCode', shippingAddress?.postalCode as number);
  }, []);

  const submitHandler = ({
    fullname,
    address,
    city,
    country,
    postalCode,
  }: IShippingAddress) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullname, address, city, country, postalCode },
    });
    router.push(`${url.paymentUrl}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <Typography variant="h5" className={styles.mainTitle}>
          <strong>{language === 'English' ? 'Checkout' : 'بررسی '}</strong>
        </Typography>
        <CheckoutWizard activeStep={1} language={language} />
        <Typography
          align={language === 'English' ? 'left' : 'right'}
          variant="h6"
          className={styles.secondTitle}
        >
          <strong style={{ fontSize: '17px' }}>
            {language === 'English' ? 'Shipping Address' : 'آدرس محل '}
          </strong>
        </Typography>
        <List dir={language === 'English' ? 'ltr' : 'rtl'}>
          <ListItem>
            <Controller
              name="fullname"
              control={control}
              rules={{ required: true, minLength: 5 }}
              render={({ field }) => (
                <TextField
                  dir={language === 'English' ? 'ltr' : 'rtl'}
                  variant="outlined"
                  fullWidth
                  id="fullname"
                  placeholder={
                    language === 'English' ? 'Full Name*' : 'نام و نام خانوادگی'
                  }
                  inputProps={{
                    style: { fontSize: '14px' },
                    type: 'text',
                  }}
                  defaultValue=""
                  error={Boolean(errors.fullname)}
                  helperText={
                    language === 'English'
                      ? errors.fullname
                        ? errors.fullname.type === 'minLength'
                          ? 'Full Name min length must be 5'
                          : 'Full Name is required'
                        : ''
                      : errors.fullname
                      ? errors.fullname.type === 'minLength'
                        ? 'ناو نام خانودگی کامل نیست'
                        : 'نام ونام خانوادگی الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  placeholder={language === 'English' ? 'Address*' : 'آدرس'}
                  inputProps={{
                    style: { fontSize: '14px' },
                    type: 'text',
                  }}
                  defaultValue=""
                  error={Boolean(errors.address)}
                  helperText={
                    language === 'English'
                      ? errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Address min length must be 3'
                          : 'Address is required'
                        : ''
                      : errors.address
                      ? errors.address.type === 'minLength'
                        ? 'آدرس کامل نیست'
                        : 'آدرس الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                />
              )}
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Controller
              name="postalCode"
              control={control}
              rules={{ required: true, minLength: 10 }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  placeholder={
                    language === 'English' ? 'Zip / Postal Code*' : 'کد پستی'
                  }
                  inputProps={{
                    style: { fontSize: '14px' },
                    type: 'text',
                  }}
                  defaultValue=""
                  error={Boolean(errors.postalCode)}
                  helperText={
                    language === 'English'
                      ? errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'Postal Code min length must be 10'
                          : 'Postal Code is required'
                        : ''
                      : errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'کد پستی باید ده رقم باشد'
                        : ' کد پستی الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  placeholder={language === 'English' ? 'City*' : 'شهر'}
                  inputProps={{
                    style: { fontSize: '14px' },
                    type: 'text',
                  }}
                  defaultValue=""
                  error={Boolean(errors.city)}
                  helperText={
                    language === 'English'
                      ? errors.city
                        ? errors.city.type === 'minLength'
                          ? 'City min length must be 3'
                          : 'City is required'
                        : ''
                      : errors.city
                      ? errors.city.type === 'minLength'
                        ? 'شهر باید حداقل سه کاراکتر باشد'
                        : 'شهر الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                />
              )}
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Controller
              name="country"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  placeholder={language === 'English' ? 'Country*' : 'کشور'}
                  inputProps={{
                    style: { fontSize: '14px' },
                    type: 'text',
                  }}
                  defaultValue=""
                  error={Boolean(errors.country)}
                  helperText={
                    language === 'English'
                      ? errors.country
                        ? errors.country.type === 'minLength'
                          ? 'Country min length must be 3'
                          : 'Country is required'
                        : ''
                      : errors.country
                      ? errors.country.type === 'minLength'
                        ? 'کشور باید حداقل سه کاراکتر باشد'
                        : 'کشور الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                />
              )}
            />
          </ListItem>
          <br />
          <ListItem>
            <Button
              className={
                language === 'English'
                  ? styles.englishNextButton
                  : styles.persianNextButton
              }
              variant="contained"
              type="submit"
            >
              {language === 'English' ? 'Next' : 'مرحله بعد'}
            </Button>
          </ListItem>
        </List>
      </form>
    </>
  );
};

export default Shipping;
