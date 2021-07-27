import React from 'react';
import clsx from 'clsx';
import {
   Grid,
   Paper,
   Typography,
   IconButton,
   Tooltip,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useAuth } from 'src/main/auth';
import {
   markAsReadNotification,
   deleteNotification,
   selectById,
} from 'src/main/store/sliceFiles/notificationsSlice';
import { useStyles } from './NotificationItem.styles';

export const NotificationItem = ({ notificationId = '' }) => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const notification = useSelector((state) =>
      selectById(state, notificationId),
   );

   const {
      title = '',
      content = '',
      created = '',
      from = {},
      markAsRead = false,
   } = notification;
   const { name = '', surname = '' } = from;

   const { authState } = useAuth();
   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;

   let createdFromNow;
   try {
      createdFromNow = formatDistanceToNow(Date.parse(created), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      createdFromNow = '';
   }

   const handleMarkAsReadNotification = () =>
      dispatch(markAsReadNotification({ userId, token, notificationId }));

   const handleDeleteNotification = () =>
      dispatch(deleteNotification({ userId, token, notificationId }));

   return (
      <>
         {notification && (
            <Grid item xs={10} md={8} lg={6}>
               <Paper
                  className={clsx(classes.root, {
                     [classes.rootMarkAsRead]: markAsRead,
                  })}
                  elevation={6}
                  onClick={handleMarkAsReadNotification}
               >
                  <div className={classes.body}>
                     <div className={classes.header}>
                        <Typography variant="h6" className={classes.title}>
                           {title}
                        </Typography>
                        <div>
                           <Tooltip
                              title="Usuń powiadomienie"
                              arrow
                              placement="bottom"
                           >
                              <IconButton
                                 onClick={handleDeleteNotification}
                                 aria-label="delete notification"
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </Tooltip>
                        </div>
                     </div>
                     <Typography
                        variant="body2"
                        className={classes.time}
                     >{`${name} ${surname}, ${createdFromNow}`}</Typography>
                     <Typography variant="body1" className={classes.content}>
                        {content}
                     </Typography>
                  </div>
               </Paper>
            </Grid>
         )}
      </>
   );
};
