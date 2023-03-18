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
function FilterSection({ productTypes, checkBoxHandler, label }: HomeProps) {
  const productTypesValue = Object.values(productTypes)[0] as [];
  const [language, setLanguage] = useState<string | undefined>('');
  const { state } = useContext(AppCtxt);
  const [theCheckedArray, setTheCheckedArray] = useState<string[]>([]);
  const router = useRouter();
  const typeName = Object.keys(productTypes)[0];

  useEffect(() => {
    const valuesArray = [];
    if (Object.keys(router.query).length > 0) {
      const queries = Object.keys(router.query);
      for (const iterator of queries) {
        const values: string = router.query[iterator] as string;
        valuesArray.push(...values.split(','));
      }
    }
    const checked =
      Object.keys(router.query).length === 0 ? [] : [...valuesArray];
    setTheCheckedArray([...checked]);
    setLanguage(state.language);
  }, [state.language, router.query]);

  return (
    <>
      <Box className={styles.filterSection}>
        <Accordion
          defaultExpanded={true}
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
              <span>{label}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={language === 'English' ? {} : { paddingRight: 0 }}
          >
            <List>
              {productTypesValue.map((productType: string, index: number) => (
                <ListItem key={index}>
                  <FormGroup>
                    <FormControlLabel
                      label={productType}
                      value={productType}
                      control={
                        <Checkbox
                          style={
                            language === 'English'
                              ? { marginRight: '3px', padding: '0' }
                              : { marginLeft: '3px', padding: '0' }
                          }
                          size="small"
                          color="info"
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

export default FilterSection;
