import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './WorkoutsPage.styles';

const WorkoutsPage = () => {
   const classes = useStyles;
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Zajęcia trenera
         </Typography>
      </Container>
   );
};

export default WorkoutsPage;
