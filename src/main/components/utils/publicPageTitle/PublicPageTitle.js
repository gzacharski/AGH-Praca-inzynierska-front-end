import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from './PublicPageTitle.styles';

const PublicPageTitle = ({ header = '', subheader = '' }) => {
   const classes = useStyles();
   return (
      <Container maxWidth="md" className={classes.pageTitle}>
         <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
         >
            {header}
         </Typography>
         <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            gutterBottom
         >
            {subheader}
         </Typography>
      </Container>
   );
};

export { PublicPageTitle };
