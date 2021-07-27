import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Badge, Button, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { NotificationsNone } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectStatus as selectAccountStatus } from 'src/main/store/sliceFiles/accountSlice';
import {
   fetchNotifications,
   selectStatus,
   selectNotifications,
} from 'src/main/store/sliceFiles/notificationsSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './NotificationButton.styles';

const NotificationButton = (props) => {
   const accountStatus = useSelector(selectAccountStatus);
   const classes = useStyles();
   const handleClick = (history) => history.push('/notifications');

   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const notifications = useSelector(selectNotifications);

   const { authState } = useAuth();
   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchNotifications({ userId, token }));
      }
   }, [status, dispatch]);

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Skeleton
            data-testid="notification-button-skeleton"
            className={classes.skeleton}
         />
      );
   }

   const notificationsToRead = notifications.filter(
      (notification) => !notification.markAsRead,
   ).length;

   return (
      <Tooltip arrow title="Powiadomienia" placement="bottom">
         <Button
            className={classes.button}
            variant="text"
            data-testid="notification-button"
            onClick={() => handleClick(props.history)}
         >
            <Badge badgeContent={notificationsToRead} color="secondary">
               <NotificationsNone />
            </Badge>
         </Button>
      </Tooltip>
   );
};

export default withRouter(NotificationButton);
