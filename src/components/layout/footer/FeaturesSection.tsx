import React, { useContext, useState, useEffect } from 'react';
import styles from '@/styles/component/Footer.module.scss';
import { AppCtxt } from '@/utils/Store';

const FeaturesSection = () => {
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
      ></div>

      <div
        className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
          language === 'English'
            ? styles.columnListItemsContainerEnglish
            : styles.columnListItemsContainerPersian
        } `}
      >
        <span>
          {language === 'English' ? '- Fast Delievery' : 'ارسال به سراسر کشور'}
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
            ? '- 7 Days guarantee'
            : 'هفت روز ضمانت بازگشت'}
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
          {language === 'English' ? '- Online support' : 'پشتیبانی آنلاین'}
        </span>
      </div>
    </div>
  );
};

export default FeaturesSection;
