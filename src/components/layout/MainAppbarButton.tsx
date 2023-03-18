import { AppCtxt } from '@/utils/Store';
import { url } from '@/utils/values';
import { ArrowDropDown, PersonOutline } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import styles from '@/styles/component/MainAppbarButton.module.scss';

const MainAppbarButton = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppCtxt);
  const { cart, userInfo } = state;
  const [language, setLanguage] = useState<string | undefined>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuItem = {
    fontSize: '15px',
    paddingTop: '14px ',
    paddingBottom: '14px ',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px grey solid',
    '@media(maxWidth: 768px)': {
      fontSize: '13px',
      padding: '2px',
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routerHandler = (destination: string) => {
    setAnchorEl(null);
    setAnchorEl2(null);
    router.push(destination);
  };

  const logoutHanlder = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT', payload: undefined });
    router.push('/');
  };

  return (
    <span className={styles.container}>
      <Button
        dir={language === 'English' ? 'ltr' : 'rtl'}
        className={styles.navbarButton}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={
          <PersonOutline
            style={
              language === 'English'
                ? {}
                : { marginRight: 0, marginLeft: '12px' }
            }
          />
        }
        endIcon={
          <ArrowDropDown
            style={
              language === 'English'
                ? {}
                : { marginLeft: 0, marginRight: '12px' }
            }
          />
        }
      >
        {userInfo?.name}
      </Button>
      <Menu
        dir={language === 'English' ? 'ltr' : 'rtl'}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          style: {
            padding: 0,
            width: '140px',
          },
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          style={menuItem}
          onClick={() => routerHandler(`${url.profileUrl}`)}
        >
          <span>{language === 'English' ? 'Profile' : 'پروفایل'}</span>
        </MenuItem>
        <MenuItem
          style={menuItem}
          onClick={() => routerHandler(`${url.orderHistoryUrl}`)}
        >
          <span>{language === 'English' ? 'My Order' : 'سفارشات'}</span>
        </MenuItem>
        <MenuItem style={menuItem} onClick={logoutHanlder}>
          <span>{language === 'English' ? 'Logout' : 'خروج'}</span>
        </MenuItem>
      </Menu>
    </span>
  );
};

export default MainAppbarButton;
