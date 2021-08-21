/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { STATUS } from 'src/main/store';
import { PageWrapper } from 'src/main/components/utils';
import { NoNotifications } from 'src/main/components/noContent';
import {
   NotificationItem,
   NotificationItemSkeleton,
} from 'src/main/components/grid';
import {
   selectMessage,
   selectStatus,
   selectIds,
   clearMessage,
   selectNotistack,
} from 'src/main/store/sliceFiles/notificationsSlice';

const NotificationsPage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const notificationsIds = useSelector(selectIds);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);

   const { enqueueSnackbar } = useSnackbar();

   if (message) {
      enqueueSnackbar(message, {
         variant: notistackVariant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
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
