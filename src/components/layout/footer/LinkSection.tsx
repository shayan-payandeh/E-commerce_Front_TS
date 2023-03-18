import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/component/Footer.module.scss';
import { AppCtxt } from '@/utils/Store';
import { useRouter } from 'next/router';
import { url } from '@/utils/values';

const LinkSection = () => {
  const router = useRouter();
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');
  const [userTruthy, setUserTruthy] = useState(false);

  useEffect(() => {
    setLanguage(state.language);
    state.userInfo ? setUserTruthy(true) : setUserTruthy(false);
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={'row col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}>
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 ' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        {language === 'English' ? 'Links :' : ' لینک ها :'}
      </div>
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span
          onClick={
            router.pathname === `${url.home}`
              ? scrollToTop
              : () => router.push(url.home)
          }
          style={{ cursor: 'pointer' }}
        >
          {language === 'English' ? 'Home' : 'صفحه اصلی '}
        </span>
      </div>
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span
          onClick={
            router.pathname === `${url.productsUrl}`
              ? scrollToTop
              : () => router.push(url.productsUrl)
          }
          style={{ cursor: 'pointer' }}
        >
          {language === 'English' ? 'Products' : 'محصولات'}
        </span>
      </div>
      {!userTruthy && (
        <div
          className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
            language === 'English'
              ? styles.columnListItemsContainerEnglish
              : styles.columnListItemsContainerPersian
          } `}
        >
          <a
            href={`${url.registerUrl}`}
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            {language === 'English' ? 'ًRegister' : 'ثبت نام'}
          </a>
          {' - '}
          <a
            href={`${url.loginUrl}`}
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            {language === 'English' ? 'Login' : 'ورود به سایت'}
          </a>
        </div>
      )}
      {userTruthy && (
        <div
          className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
            language === 'English'
              ? styles.columnListItemsContainerEnglish
              : styles.columnListItemsContainerPersian
          } `}
        >
          <span
            onClick={
              router.pathname === `${url.profileUrl}`
                ? scrollToTop
                : () => router.push(url.profileUrl)
            }
            style={{ cursor: 'pointer' }}
          >
            {language === 'English' ? 'Profile' : 'پروفایل'}
          </span>
        </div>
      )}
    </div>
  );
};

export default LinkSection;
