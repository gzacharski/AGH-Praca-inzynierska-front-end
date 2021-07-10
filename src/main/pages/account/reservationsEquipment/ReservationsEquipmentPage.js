import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './ReservationsEquipmentPage.styles';

const SettingsPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Twoje rezerwacje sprzętu
         </Typography>
      </PageWrapper>
   );
};

export default SettingsPage;
