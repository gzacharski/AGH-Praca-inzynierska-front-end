import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './PriceListPage.styles';

const AccountPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Modyfikuj ofertę karnetów
         </Typography>
      </Container>
   );
};

export default AccountPage;
