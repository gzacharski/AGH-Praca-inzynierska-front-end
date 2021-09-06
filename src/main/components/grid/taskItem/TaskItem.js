/* eslint-disable no-unused-vars */
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
import { selectById } from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { useStyles } from './TaskItem.styles';

const TASK_STATUS = {
   LOW: { id: 'LOW', pl: 'Niski' },
   MEDIUM: { id: 'MEDIUM', pl: 'Średni' },
   HIGH: { id: 'HIGH', pl: 'Wysoki' },
   CRITICAL: { id: 'CRITICAL', pl: 'Krytyczny' },
};

export const TaskItem = ({ taskId = '' }) => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const task = useSelector((state) => selectById(state, taskId));

   const {
      title = '',
      description = '',
      creationDate = '',
      executionDate = '',
      assignedBy = {},
      assignedTo = {},
      markAsRead = false,
      priority = TASK_STATUS.LOW.id,
   } = task;
   const { name = '', surname = '' } = assignedBy;

   const { authState } = useAuth();
   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;

   let createdFromNow;
   let executionDateFromNow;
   try {
      createdFromNow = formatDistanceToNow(parseISO(creationDate), {
         locale: pl,
         addSuffix: true,
      });
      executionDateFromNow = formatDistanceToNow(parseISO(executionDate), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      createdFromNow = '';
      executionDateFromNow = '';
   }

   const handleMarkAsReadNotification = () =>
      !markAsRead && console.log('test1');

   const handleDeleteNotification = () => {
      console.log('test2');
      console.log(priority);
      console.log(TASK_STATUS[priority]);
   };

   return (
      <>
         {task && (
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
                        <Typography variant="h6" className={classes.title}>
                           {`Priorytet: ${
                              TASK_STATUS[priority]?.pl || TASK_STATUS.LOW.pl
                           }`}
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
                     <Typography variant="body2" className={classes.time}>
                        {`Zadanie stworzone przez: ${name} ${surname}, ${createdFromNow}.`}
                     </Typography>
                     <Typography variant="body2" className={classes.time}>
                        {`Wykonawca zadania: ${assignedTo?.name} ${assignedTo?.surname}. Termin wykonania: ${executionDateFromNow}`}
                     </Typography>
                     <Typography variant="body1" className={classes.content}>
                        {description}
                     </Typography>
                  </div>
               </Paper>
            </Grid>
         )}
      </>
   );
};
