import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Grid } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { PageWrapper } from 'src/main/components/utils';
import { NoNotifications } from 'src/main/components/noContent';
import { NotificationItem } from 'src/main/components/grid';
import { ConfirmationIcon } from 'src/main/components/icons';
import {
   fetchNotifications,
   markAsReadNotification,
   deleteNotification,
   selectError,
   selectMessage,
   selectStatus,
   selectNotifications,
} from 'src/main/store/sliceFiles/notificationsSlice';
import { useStyles } from './NotificationsPage.styles';

const MessagesPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const notifications = useSelector(selectNotifications);
   const message = useSelector(selectMessage);
   const error = useSelector(selectError);
   const location = useLocation();
   const { authState } = useAuth();

   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { search = '' } = location;
         dispatch(fetchNotifications({ search, userId, token }));
      }
   }, [status, dispatch]);

   if (status === STATUS.FAILED) {
      return (
         <Container className={classes.container}>
            <ConfirmationIcon onRequest={false} status={error?.status} />
            <Typography className={classes.message}>{message}</Typography>
         </Container>
      );
   }

   const handleMarkAsReadNotification = (notificationId) =>
      dispatch(markAsReadNotification({ userId, token, notificationId }));

   const handleDeleteNotification = (notificationId) =>
      dispatch(deleteNotification({ userId, token, notificationId }));

   return (
      <PageWrapper>
         {notifications.length !== 0 ? (
            <Grid
               container
               alignItems="center"
               justifyContent="center"
               spacing={3}
               direction="column"
            >
               {notifications.map(
                  ({
                     notificationId,
                     content,
                     title,
                     created,
                     from,
                     markAsRead,
                  }) => (
                     <NotificationItem
                        key={notificationId}
                        id={notificationId}
                        content={content}
                        title={title}
                        created={created}
                        from={from}
                        markAsRead={markAsRead}
                        deleteCallback={() =>
                           handleDeleteNotification(notificationId)
                        }
                        markAsReadCallback={() =>
                           handleMarkAsReadNotification(notificationId)
                        }
                     />
                  ),
               )}
            </Grid>
         ) : (
            <NoNotifications />
         )}
      </PageWrapper>
   );
};

export default MessagesPage;
