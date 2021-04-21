import React from 'react';
import { Avatar, CircularProgress } from '@material-ui/core';
import { LockOutlined, CheckCircleOutline } from '@material-ui/icons';
import { useStyles } from './LogInIcon.styles';

export const LogInIcon = ({ progress, success }) => {
   const classes = useStyles();
   if (progress) return <CircularProgress data-testid="log-in-progress"/>;
   if (success)
      return (
         <Avatar className={classes.logInIcon} data-testid="log-in-success">
            <CheckCircleOutline />
         </Avatar>
      );
   return (
      <Avatar className={classes.logInIcon} data-testid="log-in-lock">
         <LockOutlined />
      </Avatar>
   );
};
