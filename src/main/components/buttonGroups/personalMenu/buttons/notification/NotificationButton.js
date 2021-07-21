import React from 'react';
import { withRouter } from 'react-router-dom';
import { Badge, Button, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { NotificationsNone } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectStatus as selectAccountStatus } from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store';
import { useStyles } from './NotificationButton.styles';

const NotificationButton = (props) => {
   const accountStatus = useSelector(selectAccountStatus);
   const classes = useStyles();
   const handleClick = (history) => history.push('/notifications');

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Skeleton
            data-testid="notification-button-skeleton"
            className={classes.skeleton}
         />
      );
   }

   return (
      <Tooltip arrow title="Powiadomienia" placement="bottom">
         <Button
            className={classes.button}
            variant="text"
            data-testid="notification-button"
            onClick={() => handleClick(props.history)}
         >
            <Badge badgeContent={1} color="secondary">
               <NotificationsNone />
            </Badge>
         </Button>
      </Tooltip>
   );
};

export default withRouter(NotificationButton);
