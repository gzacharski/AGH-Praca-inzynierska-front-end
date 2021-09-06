import React from 'react';
import clsx from 'clsx';
import {
   Grid,
   Paper,
   Typography,
   IconButton,
   Tooltip,
   Badge,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useAuth } from 'src/main/auth';
import {
   markAsReadNotification,
   deleteNotification,
   selectById,
} from 'src/main/store/sliceFiles/notificationsSlice';
import { useStyles } from './TaskItem.styles';

export const TaskItem = ({ taskId = '' }) => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const notification = useSelector((state) => selectById(state, taskId));

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
      createdFromNow = formatDistanceToNow(parseISO(created), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      createdFromNow = '';
   }

   const handleMarkAsReadNotification = () =>
      !markAsRead &&
      dispatch(markAsReadNotification({ userId, token, taskId }));

   const handleDeleteNotification = () =>
      dispatch(deleteNotification({ userId, token, taskId }));

   return (
      <>
         {notification && (
            <Grid item xs={10} md={8} lg={6}>
               <Paper
                  className={clsx(classes.root, {
                     [classes.isRead]: markAsRead,
                     [classes.isNotRead]: !markAsRead,
                  })}
                  elevation={6}
                  onClick={handleMarkAsReadNotification}
               >
                  <div className={classes.body}>
                     <div className={classes.header}>
                        <Badge
                           color="secondary"
                           variant="dot"
                           badgeContent={markAsRead ? 0 : 1}
                        >
                           <Typography variant="h6" className={classes.title}>
                              {title}
                           </Typography>
                        </Badge>
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
