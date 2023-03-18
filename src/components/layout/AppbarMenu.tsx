import React, { useContext, useEffect, useState } from 'react';
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import * as Scroll from 'react-scroll';
import { AppCtxt } from '@/utils/Store';
import { useRouter } from 'next/router';
import styles from '@/styles/component/Appbar.module.scss';
import { menuItems } from '@/utils/values';

function AppbarMenu() {
  let Links = Scroll.Link;
  let Buttons = Scroll.Button;
  let Elements = Scroll.Element;
  let Events = Scroll.Events;
  let scroll = Scroll.animateScroll;
  let scrollSpy = Scroll.scrollSpy;
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');
  const router = useRouter();

  useEffect(() => {
    setLanguage(state.language);
    Events.scrollEvent.register('begin', function () {
      console.log('begin', arguments);
    });
    Events.scrollEvent.register('end', function () {
      console.log('end', arguments);
    });
    scrollSpy.update();
  }, []);

  const scrollToBtm = () => {
    scroll.scrollToBottom();
  };

  return (
    <header
      dir={language === 'English' ? 'ltr' : 'rtl'}
      className={styles.secondNavbar}
    >
      {menuItems.map((item) => (
        <NextLink href={item.url} passHref key={item.titleEnglish}>
          <Link style={{ textDecoration: 'none' }}>
            <div
              className={
                router.pathname === item.pathname
                  ? styles.activeTab
                  : styles.tab
              }
            >
              <Typography className={styles.menuItemText}>
                <span onClick={item.scroll ? scrollToBtm : undefined}>
                  {language === 'English'
                    ? item.titleEnglish
                    : item.titlePersian}
                </span>
              </Typography>
            </div>
          </Link>
        </NextLink>
      ))}
    </header>
  );
}

export default AppbarMenu;
