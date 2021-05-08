import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './Offer.styles';

export default function Offer() {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main">
         <Typography variant="h5" className={classes.root} align="center">
            Oferta
         </Typography>
      </Container>
   );
}
