import React from 'react';
import { Avatar } from '@material-ui/core';
import {
   LockOutlined,
   CheckCircle,
   Error,
   ReportProblem,
} from '@material-ui/icons';
import { useStyles } from './ConfirmationIcon.styles';

const ConfirmationIcon = (props) => {
   const classes = useStyles();
   const { onRequest, status } = props;

   if (!onRequest) {
      if (status === 200) {
         return (
            <Avatar
               className={classes.avatar200}
               data-testid="confirmation-icon"
            >
               <CheckCircle data-testid="check-circle" />
            </Avatar>
         );
      }
      if (status === 401 || status === 403 || status === 404) {
         return (
            <Avatar
               className={classes.avatar400}
               data-testid="confirmation-icon"
            >
               <ReportProblem data-testid="report-problem" />
            </Avatar>
         );
      }
      if (status === 500) {
         return (
            <Avatar
               className={classes.avatar500}
               data-testid="confirmation-icon"
            >
               <Error data-testid="error" />
            </Avatar>
         );
      }
   }
   return (
      <Avatar className={classes.avatar} data-testid="confirmation-icon">
         <LockOutlined data-testid="lock" />
      </Avatar>
   );
};

export default ConfirmationIcon;
