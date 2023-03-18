import ProfileAndHistory from '@/components/ProfileAndHistory';
import { AppCtxt } from '@/utils/Store';
import { url } from '@/utils/values';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Box,
  List,
  ListItem,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import styles from '@/styles/profile.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import getError from '@/utils/getError';
import AuthService from '@/service/AuthService';
import { IUserRegister } from '@/utils/interface/user';

const Profile = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<IUserRegister>();
  const [language, setLanguage] = useState<string | undefined>('');
  const { state, dispatch } = useContext(AppCtxt);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [progressFlag, setProgressFlag] = useState(false);

  useEffect(() => {
    setLanguage(state.language);
    if (!userInfo) {
      router.push(`${url.loginUrl}?redirect=${url.profileUrl}`);
    }
    setValue('name', userInfo?.name as string);
    setValue('email', userInfo?.email as string);
  }, []);

  const editInfo: SubmitHandler<IUserRegister> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const message =
      language === 'English'
        ? 'User updated successfully'
        : 'اطلاعات کاربر با موفقیت بروزرسانی شد';
    const passwordMessage =
      language === 'English'
        ? "Passwords don't match"
        : 'رمز عبورها باید یکسان باشد';
    closeSnackbar();
    setProgressFlag(true);

    if (password !== confirmPassword) {
      enqueueSnackbar(passwordMessage, { variant: 'error' });
      return;
    }
    const response = await AuthService.update(
      { name, email, password },
      userInfo?.token as string
    );
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
    <Grid
      container
      spacing={1}
      direction={language === 'English' ? 'row' : 'row-reverse'}
    >
      <Grid item md={3} xs={12}>
        <ProfileAndHistory pathname={`${url.profileUrl}`} />
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className={styles.profileContainer}>
          <List>
            <ListItem>
              <span
                className={
                  language === 'English' ? styles.title : styles.persianTitle
                }
              >
                {language === 'English' ? 'Profile' : 'اطلاعات کاربر'}
              </span>
            </ListItem>
            <ListItem dir={language === 'English' ? 'ltr' : 'rtl'}>
              <form
                onSubmit={handleSubmit(editInfo)}
                className={styles.form}
                dir={language === 'English' ? 'ltr' : 'rtl'}
              >
                <List>
                  <ListItem>
                    <Controller
                      name="name"
                      rules={{ required: true, minLength: 3 }}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="name"
                          placeholder={
                            language === 'English' ? 'Name *' : 'نام'
                          }
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
                      control={control}
                      rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      }}
                      render={({ field }) => (
                        <TextField
                          id="email"
                          variant="outlined"
                          fullWidth
                          placeholder={
                            language === 'English' ? 'Email' : 'ایمیل'
                          }
                          defaultValue=""
                          inputProps={{
                            type: 'email',
                            style: {
                              padding: '14px',
                              fontSize: '14px',
                            },
                          }}
                          error={Boolean(errors.email)}
                          helperText={
                            language === 'English'
                              ? errors.email
                                ? errors.email.type === 'pattern'
                                  ? 'Email is not valid'
                                  : 'Email is required'
                                : ''
                              : errors.email
                              ? errors.email.type === 'pattern'
                                ? 'ایمیل معتبر نیست'
                                : 'ایمیل الزامی است'
                              : ''
                          }
                          FormHelperTextProps={{
                            style: {
                              padding: '14px',
                              fontSize: '14px',
                            },
                          }}
                          {...field}
                        />
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) =>
                          value === '' ||
                          value.length > 5 ||
                          'Password length is more than 5',
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="password"
                          placeholder={
                            language === 'English' ? 'Password' : 'رمز عبور'
                          }
                          inputProps={{
                            type: 'password',
                            style: {
                              padding: '14px',
                              fontSize: '14px',
                            },
                          }}
                          error={Boolean(errors.password)}
                          helperText={
                            language === 'English'
                              ? errors.password
                                ? 'Password length is more than 5'
                                : ''
                              : errors.password
                              ? 'رمز عبور باید حداقل 6 کاراکتر باشد'
                              : ''
                          }
                          FormHelperTextProps={{
                            style: {
                              textAlign: 'start',
                            },
                          }}
                          {...field}
                        />
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) =>
                          value === '' ||
                          value.length > 5 ||
                          'Confirm Password length is more than 5',
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="confirmPassword"
                          placeholder={
                            language === 'English'
                              ? 'Confirm Password'
                              : 'تایید رمز عبور'
                          }
                          inputProps={{
                            type: 'password',
                            style: {
                              padding: '14px',
                              fontSize: '14px',
                            },
                          }}
                          error={Boolean(errors.confirmPassword)}
                          helperText={
                            language === 'English'
                              ? errors.password
                                ? 'Confirm Password length is more than 5'
                                : ''
                              : errors.password
                              ? 'تایید رمز عبور باید حداقل 6 کاراکتر باشد'
                              : ''
                          }
                          FormHelperTextProps={{
                            style: {
                              textAlign: 'start',
                            },
                          }}
                          {...field}
                        />
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      size="large"
                      className={styles.updateButton}
                    >
                      <span>
                        {language === 'English' ? 'Update' : 'بروز رسانی'}
                      </span>
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
                </List>
              </form>
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
