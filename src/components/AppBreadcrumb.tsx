import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppCtxt } from '@/utils/Store';
import styles from '@/styles/component/Breadcrumb.module.scss';

type HomeProps = {
  array: { name: string; link: string }[];
  currentPage: string | string[] | undefined;
};

function AppBreadcrumb({ array, currentPage }: HomeProps) {
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  const mainArray =
    language === 'English'
      ? [{ name: 'Home', link: '/' }, ...array]
      : [{ name: 'خانه', link: '/' }, ...array];
  return (
    <Box className={styles.breadcrumbContainer}>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        style={
          language === 'English' ? { direction: 'ltr' } : { direction: 'rtl' }
        }
      >
        {mainArray.map((item, index) => (
          <Link
            key={index}
            underline="hover"
            color="textPrimary"
            href={item.link}
          >
            {item.name}
          </Link>
        ))}
        <Typography>{currentPage}</Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default AppBreadcrumb;
