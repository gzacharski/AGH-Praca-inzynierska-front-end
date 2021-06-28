import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './ReservationsGroupWorkoutPage.styles';

const SettingsPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Twoje rezerwacje zajęć grupowych
         </Typography>
      </Container>
   );
};

export default SettingsPage;
