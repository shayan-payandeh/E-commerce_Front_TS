import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/FilterSection.module.scss';
import { useRouter } from 'next/router';
import { AppCtxt } from '@/utils/Store';

type HomeProps = {
  productTypes: {
    slug?: string[];
    brand?: string[];
  };
  checkBoxHandler: (value: string, checked: boolean, typeName: string) => void;
  label: string;
};

function FilterSectionMobile({
  productTypes,
  checkBoxHandler,
  label,
}: HomeProps) {
  const [language, setLanguage] = useState<string | undefined>('');
  const { state } = useContext(AppCtxt);
  const [theCheckedArray, setTheCheckedArray] = useState<string[]>([]);
  const router = useRouter();
  const typeName = Object.keys(productTypes)[0];

  useEffect(() => {
    let slugValuesArray: string[] = [];
    let brandValuesArray: string[] = [];
    if (router.query.slug) {
      const slugValues = router.query.slug as string;
      slugValuesArray = slugValues.split(',');
    }
    if (router.query.brand) {
      const brandValues = router.query.brand as string;
      brandValuesArray = brandValues.split(',');
    }
    const checked =
      !router.query.slug && !router.query.brand
        ? []
        : [...slugValuesArray, ...brandValuesArray];
    setTheCheckedArray([...checked]);
    setLanguage(state.language);
  }, [state.language, router.query]);

  return (
    <>
      <Box className={styles.filterSectionMobile}>
        <Accordion
          defaultExpanded={false}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <AccordionSummary
            style={{
              backgroundColor: '#f5f5f5',
              width: '100%',
              padding: '4px 10px',
            }}
            // aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMore />}
          >
            <Typography>
              <span style={{ fontFamily: 'IRANsans' }}>{label}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={language === 'English' ? {} : { paddingRight: 0 }}
          >
            <List>
              {Object.values(productTypes)[0].map((productType, index) => (
                <ListItem key={index}>
                  <FormGroup>
                    <FormControlLabel
                      // inputProps={{ 'aria-label': 'controlled' }}
                      label={productType}
                      value={productType}
                      control={
                        <Checkbox
                          style={
                            language === 'English'
                              ? { marginRight: '4px', padding: '0' }
                              : { marginLeft: '4px', padding: '0' }
                          }
                          size="small"
                          color="primary"
                          onChange={(e) =>
                            checkBoxHandler(
                              e.target.value,
                              e.target.checked,
                              typeName
                            )
                          }
                          checked={
                            theCheckedArray.find((item) => item === productType)
                              ? true
                              : false
                          }
                        />
                      }
                    />
                  </FormGroup>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default FilterSectionMobile;
