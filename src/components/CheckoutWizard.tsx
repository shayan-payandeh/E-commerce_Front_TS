import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import styles from '@/styles/component/Checkout.module.scss';

type HomeProps = {
  activeStep: number;
  language: string | undefined;
};

function CheckoutWizard({ activeStep = 0, language }: HomeProps) {
  const steps =
    language === 'English'
      ? ['Login', 'Shipping Address', 'Payment Method', 'Place Order']
      : ['ورود', ' ثبت آدرس', 'پرداخت', 'ثبت سفارش'];
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      style={{
        marginTop: '25px',
        marginBottom: '25px',
      }}
      sx={{
        '& .MuiStepLabel-root .Mui-completed': {
          color: styles.primary, // circle color (COMPLETED)
        },
        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
          color: 'grey.500', // Just text label (COMPLETED)
        },
        '& .MuiStepLabel-root .Mui-active': {
          color: styles.primary, // circle color (ACTIVE)
        },
        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
          color: 'common.black', // Just text label (ACTIVE)
        },
        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
          fill: 'white', // circle's number (ACTIVE)
        },
      }}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>
            <span style={{ fontSize: '12px' }}>{step}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CheckoutWizard;
