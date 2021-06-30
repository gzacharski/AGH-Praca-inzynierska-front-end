import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './NotificationsPage.styles';

const MessagesPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Powiadomienia (użytkownik)
         </Typography>
      </Container>
   );
};

export default MessagesPage;
