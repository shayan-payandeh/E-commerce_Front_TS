import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/component/Footer.module.scss';
import { AppCtxt } from '@/utils/Store';
import CopyrightSection from './CopyrightSection';
import ContactUsSection from './ContactUsSection';
import FeaturesSection from './FeaturesSection';
import LinkSection from './LinkSection';

function Footer() {
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  return (
    <footer className={styles.footer}>
      <div
        className={'row' + ' ' + styles.mainFooter}
        style={language !== 'English' ? { direction: 'rtl' } : {}}
      >
        <LinkSection />
        <ContactUsSection />
        <FeaturesSection />
      </div>

      <CopyrightSection />
    </footer>
  );
}

export default Footer;
