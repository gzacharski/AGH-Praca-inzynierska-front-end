import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './ReservationsIndivudualWorkoutPage.styles';

const SettingsPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Twoje rezerwacje zajęć indywidualnych
         </Typography>
      </Container>
   );
};

export default SettingsPage;
