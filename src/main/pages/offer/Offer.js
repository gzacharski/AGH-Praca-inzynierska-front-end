import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { ShowTrainings } from 'src/main/components/gallery';
import { useStyles } from './Offer.styles';

export default function Offer() {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Oferta zajęć grupowych
         </Typography>
         <ShowTrainings />
      </Container>
   );
}
