import AuthService from '@/service/AuthService';
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppCtxt } from '@/utils/Store';
import { useSnackbar } from 'notistack';
import getError from '@/utils/getError';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from '@/styles/login.module.scss';
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { url } from '@/utils/values';
import NextLink from 'next/link';
import { IUserLogin } from '@/utils/interface/user';

function Login() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IUserLogin>();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [progressFlag, setProgressFlag] = useState(false);

  useEffect(() => {
    setLanguage(state.language);
    if (state.userInfo) router.push('/');
  }, []);

  const login: SubmitHandler<IUserLogin> = async ({ email, password }) => {
    const message =
      language === 'English' ? 'Success Login' : 'به فروشگاه ما خوش آمدید';
    closeSnackbar();
    setProgressFlag(true);

    const response = await AuthService.login({ email, password });
    if (response instanceof Error) {
      const error: any = response;
      enqueueSnackbar(getError(error, language as string), {
        variant: 'error',
      });
      setProgressFlag(false);
    } else if (typeof response !== 'undefined') {
      dispatch({ type: 'USER_LOGIN', payload: response.data });
      router.push((redirect as string) || '/');
      enqueueSnackbar(message, { variant: 'success' });
      setProgressFlag(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(login)}
      className={styles.loginForm}
      dir={language === 'English' ? 'ltr' : 'rtl'}
    >
      <List>
        <ListItem>
          <AccountCircleOutlined className={styles.icon} />
        </ListItem>
        <ListItem>
          <Typography className={styles.title}>
            <span>{language === 'English' ? 'Sign in' : 'ورود به سایت'}</span>
          </Typography>
        </ListItem>
        <ListItem>
          <Controller
            name="email"
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                id="email"
                fullWidth
                placeholder={language === 'English' ? 'Email *' : 'ایمیل '}
                inputProps={{
                  type: 'email',
                  style: { fontSize: '13px' },
                }}
                error={Boolean(errors.email)}
                helperText={
                  language === 'English'
                    ? errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is Required'
                      : ''
                    : errors.email
                    ? errors.email.type === 'pattern'
                      ? 'ایمیل معتبر نیست'
                      : 'ایمیل الزامی است'
                    : ''
                }
                FormHelperTextProps={{
                  style: { textAlign: 'start' },
                }}
                {...field}
              ></TextField>
            )}
          />
        </ListItem>
        <ListItem>
          <Controller
            name="password"
            rules={{ required: true, minLength: 6 }}
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                placeholder={language === 'English' ? 'Password *' : 'رمز عبور'}
                inputProps={{
                  type: 'password',
                  style: { fontSize: '13px' },
                }}
                error={Boolean(errors.password)}
                helperText={
                  language === 'English'
                    ? errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password minLength more than 5'
                        : 'Password is required'
                      : ''
                    : errors.password
                    ? errors.password.type === 'minLength'
                      ? 'رمز عبور کوتاه است'
                      : 'رمز عبور الزامی است'
                    : ''
                }
                FormHelperTextProps={{
                  style: { textAlign: 'start' },
                }}
                {...field}
              ></TextField>
            )}
          />
        </ListItem>
        <br />
        <br />
        <ListItem>
          <Button
            className={styles.loginButton}
            type="submit"
            variant="contained"
            fullWidth
          >
            <span>{language === 'English' ? 'Login' : 'ورود'}</span>
            {progressFlag && (
              <CircularProgress size={30} className={styles.circularProgress} />
            )}
          </Button>
        </ListItem>
        <ListItem dir={language === 'English' ? 'ltr' : 'rtl'}>
          <span>
            {language === 'English'
              ? "Don't have an account?"
              : 'حساب کاربری ندارید ؟'}
          </span>
          &nbsp;
          <NextLink
            href={
              redirect
                ? `${url.registerUrl}?redirect=${redirect}`
                : `${url.registerUrl}`
            }
            passHref
          >
            <Link style={{ color: '#0667a9' }}>
              <span>{language === 'English' ? 'Register' : 'ثبت نام'}</span>
            </Link>
          </NextLink>
        </ListItem>
      </List>
    </form>
  );
}

export default Login;
