import {
  Button,
  CircularProgress,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { AccountCircleOutlined } from '@mui/icons-material';
import styles from '@/styles/Login.module.scss';
import { AppCtxt } from '@/utils/Store';
import getError from '@/utils/getError';
import AuthService from '@/service/AuthService';
import { url } from '@/utils/values';
import { IUserRegister } from '@/utils/interface/user';

function Register() {
  const [progressFlag, setProgressFlag] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(AppCtxt);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  const [language, setLanguage] = useState<string | undefined>('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserRegister>();

  useEffect(() => {
    setLanguage(state.language);
    if (userInfo) {
      router.push((redirect as string) || '/');
    }
  }, []);

  const register: SubmitHandler<IUserRegister> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const message =
      language === 'English' ? 'Success Register' : 'به فروشگاه ما خوش آمدید';
    const errorMsg =
      language === 'English'
        ? " Passwords don't match"
        : 'رمزهای عبور یکسان نیستند';
    closeSnackbar();
    setProgressFlag(true);

    if (password !== confirmPassword) {
      enqueueSnackbar(errorMsg, { variant: 'error' });
      return;
    }

    const response = await AuthService.register({
      email,
      name,
      password,
      confirmPassword,
    });
    if (response instanceof Error) {
      const error: any = response;
      enqueueSnackbar(getError(error, language as string), {
        variant: 'error',
      });
      setProgressFlag(false);
    } else if (typeof response !== 'undefined') {
      dispatch({ type: 'USER_LOGIN', payload: response.data });
      enqueueSnackbar(message, { variant: 'success' });
      router.push((redirect as string) || '/');
      setProgressFlag(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(register)}
        className={styles.loginForm}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <List>
          <ListItem>
            <AccountCircleOutlined className={styles.icon} />
          </ListItem>
          <ListItem>
            <Typography className={styles.title}>
              <span>{language === 'English' ? 'Sign up' : 'عضویت'}</span>
            </Typography>
          </ListItem>
          <br />
          <ListItem>
            <Controller
              name="name"
              rules={{ required: true, minLength: 3 }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="name"
                  placeholder={language === 'English' ? 'Name *' : 'نام'}
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  inputProps={{
                    type: 'text',
                    style: { fontSize: '13px' },
                  }}
                  error={Boolean(errors.name)}
                  helperText={
                    language === 'English'
                      ? errors.name
                        ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                      : errors.name
                      ? errors.name.type === 'minLength'
                        ? 'نام باید حداقل دو کاراکتر باشد'
                        : 'نام الزامی است'
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
              name="email"
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="email"
                  placeholder={language === 'English' ? 'Email *' : 'ایمیل'}
                  fullWidth
                  variant="outlined"
                  defaultValue=""
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
                />
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
                  id="password"
                  placeholder={
                    language === 'English' ? 'Password *' : 'رمز عبور'
                  }
                  fullWidth
                  variant="outlined"
                  defaultValue=""
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
                  {...field}
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              rules={{ required: true, minLength: 6 }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="confirmPassword"
                  placeholder={
                    language === 'English'
                      ? 'Confirm Password *'
                      : 'تایید رمز عبور'
                  }
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  inputProps={{
                    type: 'password',
                    style: { fontSize: '13px' },
                  }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    language === 'English'
                      ? errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password must be more than 5 chracters'
                          : 'Confirm Password is Required'
                        : ''
                      : errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'تایید رمز عبور کوتاه است'
                        : 'تایید رمز عبور الزامی است'
                      : ''
                  }
                  {...field}
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                />
              )}
            />
          </ListItem>
          <br />
          <ListItem>
            <Button
              type="submit"
              className={styles.loginButton}
              variant="contained"
              fullWidth
              size="large"
            >
              {language === 'English' && <span>{'Register'}</span>}
              {language !== 'English' && (
                <span style={{ fontSize: '14px' }}>{'ثبت نام'}</span>
              )}

              {progressFlag && (
                <CircularProgress
                  size={30}
                  style={{
                    color: 'blue',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>
          </ListItem>
          <ListItem dir={language === 'English' ? 'ltr' : 'rtl'}>
            {language === 'English' && (
              <span>{'Already have an account?'}</span>
            )}
            {language !== 'English' && (
              <span style={{ fontSize: '14px' }}>{' عضو سایت هستید؟'}</span>
            )}
            &nbsp;
            <NextLink
              href={
                redirect
                  ? `${url.loginUrl}?redirect=${redirect}`
                  : `${url.loginUrl}`
              }
              passHref
            >
              <Link style={{ color: '#0667a9' }}>
                {language === 'English' && <span>{'Login'}</span>}
                {language !== 'English' && (
                  <span style={{ fontSize: '14px' }}>{'ورود به سایت'}</span>
                )}
              </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </>
  );
}

export default Register;
