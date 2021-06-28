import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './ReservationsEquipmentPage.styles';

const SettingsPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Twoje rezerwacje sprzętu
         </Typography>
      </Container>
   );
};

export default SettingsPage;
