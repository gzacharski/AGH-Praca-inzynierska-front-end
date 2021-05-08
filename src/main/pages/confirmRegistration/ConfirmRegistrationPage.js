import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './ConfirmRegistrationPage.styles';

export default function ConfirmRegistration() {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testId="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Potwierdzenie rejestracji
         </Typography>
      </Container>
   );
}
