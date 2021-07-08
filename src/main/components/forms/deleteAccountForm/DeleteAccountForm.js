import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useStyles } from './DeleteAccountForm.styles';

export const DeleteAccountForm = () => {
   const classes = useStyles();
   return (
      <Paper className={classes.paper}>
         <Typography component="h2" variant="h5" color="primary" gutterBottom>
            Usuń konto
         </Typography>
      </Paper>
   );
};
