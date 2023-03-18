import { AppCtxt } from '@/utils/Store';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/component/Appbar.module.scss';
import {
  Badge,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/eCommerceLogo.png';
import dynamic from 'next/dynamic';
import { AddShoppingCart, ShoppingCart } from '@mui/icons-material';
import MainAppbarButton from './MainAppbarButton';
import toPersianNumber from '@/utils/persianNumber';

function MainAppbar() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppCtxt);
  const { cart, userInfo } = state;
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const languageHandler = (language: string) => {
    dispatch({ type: 'LANGUAGE_CHANGE', payload: language });
    router.reload();
  };

  return (
    <>
      <header
        className={styles.mainNavbar}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <Toolbar>
          <NextLink href={'/'} passHref>
            <Link>
              <Image src={logo} alt={'shayan'} width={95} height={40} />
            </Link>
          </NextLink>

          <div className={styles.grow}></div>

          <Button
            onClick={() => {
              languageHandler(language === 'English' ? 'Farsi' : 'English');
            }}
          >
            <Typography className={styles.languageText}>
              <span>{language === 'English' ? 'Fa' : 'En'}</span>
            </Typography>
          </Button>

          <div>
            {userInfo ? (
              <>
                <MainAppbarButton />
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>
                  {language === 'English' && (
                    <span className={styles.englishLink}>{'Login'}</span>
                  )}
                  {language !== 'English' && (
                    <span className={styles.persianLink}>
                      {'ثبت نام / ورود'}
                    </span>
                  )}
                </Link>
              </NextLink>
            )}

            <NextLink href="/cart" passHref>
              <Link>
                {typeof cart?.cartItems?.length !== 'undefined' &&
                cart?.cartItems?.length > 0 ? (
                  <IconButton aria-label="cart" style={{ color: 'white' }}>
                    <Badge
                      badgeContent={
                        language === 'English'
                          ? cart?.cartItems?.length
                          : toPersianNumber(cart?.cartItems?.length)._str
                      }
                      color="error"
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                ) : (
                  <IconButton
                    style={{ color: 'white' }}
                    aria-label="add to shopping cart"
                  >
                    <AddShoppingCart />
                  </IconButton>
                )}
              </Link>
            </NextLink>
          </div>
        </Toolbar>
      </header>
    </>
  );
}

export default dynamic(() => Promise.resolve(MainAppbar), { ssr: false });
