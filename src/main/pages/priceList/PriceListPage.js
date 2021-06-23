import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { ShowTrainings } from 'src/main/components/gallery';
import { useStyles } from './PriceListPage.styles';

export default function Offer() {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Oferta karnetów
         </Typography>
         <ShowTrainings />
      </Container>
   );
}
