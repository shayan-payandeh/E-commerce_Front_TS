import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/component/Footer.module.scss';
import { AppCtxt } from '@/utils/Store';

const ContactUsSection = () => {
  const { state } = useContext(AppCtxt);
  const [language, setLanguage] = useState<string | undefined>('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  return (
    <div className={'row col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}>
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 ' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        {language === 'English' ? 'Contact us :' : 'تماس با ما :'}
      </div>

      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span>
          {language === 'English'
            ? 'Address: Bandarabbas - Pasdaran blvd - Goharan street'
            : 'آدرس : بندرعباس - بلوار پاسدان - خیابان گوهران '}
        </span>
      </div>
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span>
          {language === 'English'
            ? 'Phone: 989308177569'
            : 'شماره تماس : 09308177569'}
        </span>
      </div>
      <br />
      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span>
          {language === 'English'
            ? 'Email : shayan.@gmail.com'
            : 'ایمیل : shayan.iker@gmail.com'}
        </span>
      </div>
    </div>
  );
};

export default ContactUsSection;
