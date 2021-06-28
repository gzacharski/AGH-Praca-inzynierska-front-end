import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './TrainerPage.styles';

const TrainerPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Strona trenera
         </Typography>
      </Container>
   );
};

export default TrainerPage;
