import { CloseRounded, MenuRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/Appbar.module.scss';
import { AppCtxt } from '@/utils/Store';
import { url } from '@/utils/values';

function AppbarMenuMobile() {
  const [expandMenu, setExpandMenu] = useState(false);
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');
  const listItemLink = {
    color: styles.whites,
  };
  const divider = {
    width: '100%',
    backgroundColor: '#dedede',
    margin: '0 auto',
  };
  const listStyle = {
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const listItemStyle = { display: 'flex', justifyContent: 'center' };
  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const clickHandler = () => {
    setExpandMenu((prev) => !prev);
    setExpandMenu(false);
  };
  return (
    <>
      <header color="default" className={styles.secondeNavbarMobile}>
        <Accordion className={styles.accordion} defaultExpanded={false}>
          <AccordionSummary
            className={expandMenu ? styles.expanded : styles.notExpanded}
            onClick={() => setExpandMenu((prev) => !prev)}
            expandIcon={!expandMenu ? <MenuRounded /> : <CloseRounded />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          ></AccordionSummary>
          <AccordionDetails className={styles.details}>
            <List style={listStyle}>
              <ListItem style={listItemStyle}>
                <NextLink href={'/'} passHref>
                  <Typography style={listItemLink}>
                    {language === 'English' ? 'Home' : 'خانه'}
                  </Typography>
                </NextLink>
              </ListItem>
              <ListItem>
                <Divider style={divider} />
              </ListItem>
              <ListItem style={listItemStyle}>
                <NextLink href={`${url.productsUrl}`} passHref>
                  <Typography style={listItemLink}>
                    {language === 'English' ? 'Products' : 'محصولات'}
                  </Typography>
                </NextLink>
              </ListItem>
              <ListItem>
                <Divider style={divider} />
              </ListItem>
              <ListItem style={listItemStyle}>
                <NextLink href={`${url.contactUrl}`} passHref>
                  <Typography style={listItemLink}>
                    {language === 'English' ? 'contact' : 'ارتباط با ما'}
                  </Typography>
                </NextLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </header>
    </>
  );
}

export default AppbarMenuMobile;
