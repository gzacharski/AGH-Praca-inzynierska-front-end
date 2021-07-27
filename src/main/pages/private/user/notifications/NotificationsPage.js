import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Grid } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { PageWrapper } from 'src/main/components/utils';
import { NoNotifications } from 'src/main/components/noContent';
import {
   NotificationItem,
   NotificationItemSkeleton,
} from 'src/main/components/grid';
import { ConfirmationIcon } from 'src/main/components/icons';
import {
   fetchNotifications,
   selectError,
   selectMessage,
   selectStatus,
   selectIds,
} from 'src/main/store/sliceFiles/notificationsSlice';
import { useStyles } from './NotificationsPage.styles';

const NotificationsPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const notificationsIds = useSelector(selectIds);
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
         <PageWrapper>
            <Container className={classes.container}>
               <ConfirmationIcon onRequest={false} status={error?.status} />
               <Typography className={classes.message}>{message}</Typography>
            </Container>
         </PageWrapper>
      );
   }

   if (status === STATUS.LOADING && notificationsIds.length === 0) {
      return (
         <PageWrapper>
            <Grid
               container
               alignItems="center"
               justifyContent="center"
               spacing={3}
               direction="column"
            >
               <NotificationItemSkeleton />
               <NotificationItemSkeleton />
               <NotificationItemSkeleton />
            </Grid>
         </PageWrapper>
      );
   }

   return (
      <PageWrapper>
         {notificationsIds.length !== 0 ? (
            <Grid
               container
               alignItems="center"
               justifyContent="center"
               spacing={3}
               direction="column"
            >
               {notificationsIds.map((id) => (
                  <NotificationItem key={id} notificationId={id} />
               ))}
            </Grid>
         ) : (
            <NoNotifications />
         )}
      </PageWrapper>
   );
};

export default NotificationsPage;
