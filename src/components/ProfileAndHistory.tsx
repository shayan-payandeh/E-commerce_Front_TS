import React, { useState, useEffect, useContext } from 'react';
import { AppCtxt } from '@/utils/Store';
import NextLink from 'next/link';
import { Card, List, ListItem, ListItemText } from '@mui/material';
import { url } from '@/utils/values';
import styles from '@/styles/component/Card.module.scss';

type HomeProps = {
  pathname: string;
};
const ProfileAndHistory = ({ pathname }: HomeProps) => {
  const [language, setLanguage] = useState<string | undefined>('');
  const { state, dispatch } = useContext(AppCtxt);

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const items = [
    {
      title: 'User Profile',
      persianTitle: 'پروفایل',
      address: `${url.profileUrl}`,
    },
    {
      title: 'Order History',
      persianTitle: 'تاریخچه خرید',
      address: `${url.orderHistoryUrl}`,
    },
  ];
  return (
    <>
      <Card className={styles.section}>
        <List style={{ padding: 0 }}>
          {items.map((item) => (
            <NextLink href={item.address} passHref key={item.title}>
              <ListItem
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  color: 'black',
                }}
                selected={pathname === `${item.address}` ? true : false}
                className={
                  pathname === `${item.address}`
                    ? styles.activeItem
                    : styles.item
                }
                button
                component="a"
              >
                {language === 'English' && (
                  <ListItemText primary={item.title} />
                )}
                {language !== 'English' && (
                  <span
                    style={{
                      marginRight: 0,
                      marginLeft: 'auto',
                      fontSize: '14px',
                    }}
                  >
                    {item.persianTitle}
                  </span>
                )}
              </ListItem>{' '}
            </NextLink>
          ))}
        </List>
      </Card>
    </>
  );
};

export default ProfileAndHistory;
