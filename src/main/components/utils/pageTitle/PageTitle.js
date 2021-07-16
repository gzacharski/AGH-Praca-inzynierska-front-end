import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './PageTitle.styles';

export const PageTitle = (props) => {
   const classes = useStyles();
   const { children } = props;
   return (
      <Typography variant="h5" className={classes.root} align="center">
         {children}
      </Typography>
   );
};
