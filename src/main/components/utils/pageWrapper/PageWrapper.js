import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './PageWrapper.styles';

export const PageWrapper = (props) => {
   const classes = useStyles();
   const { children } = props;
   return (
      <Container
         maxWidth="xl"
         component="main"
         data-testid="main-container"
         className={classes.root}
      >
         {children}
      </Container>
   );
};
