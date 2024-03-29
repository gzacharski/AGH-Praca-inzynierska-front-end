import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './PageWrapper.styles';

export const PageWrapper = (props) => {
   const classes = useStyles();
   const { children } = props;
   return (
      <Container
         maxWidth="xl"
         data-testid="page-container"
         className={classes.root}
      >
         {children}
      </Container>
   );
};
