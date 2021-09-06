/* eslint-disable no-unused-vars */
import React from 'react';
import {
   Grid,
   Paper,
   Typography,
   IconButton,
   Tooltip,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
   const history = useHistory();

   const task = useSelector((state) => selectById(state, taskId));

   const {
      title = '',
      description = '',
      creationDate = '',
      executionDate = '',
      manager = {},
      employee = {},
      priority = TASK_STATUS.LOW.id,
   } = task;

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

   const handleEditTask = () => history.push(`/manager/tasks/${taskId}`);
   const handleDeleteTask = () => console.log('Delete task');

   return (
      <>
         {task && (
            <Grid item xs={10} md={8} lg={6}>
               <Paper className={classes.root} elevation={6}>
                  <div className={classes.body}>
                     <div className={classes.header}>
                        <Typography variant="h6" className={classes.title}>
                           {title}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                           {`Priorytet: ${
                              TASK_STATUS[priority]?.pl || TASK_STATUS.LOW.pl
                           }`}
                        </Typography>
                        <div>
                           <Tooltip
                              title="Edytuj zadanie"
                              arrow
                              placement="bottom"
                           >
                              <IconButton
                                 onClick={handleEditTask}
                                 aria-label="edit task"
                              >
                                 <EditIcon />
                              </IconButton>
                           </Tooltip>
                           <Tooltip
                              title="Usuń zadanie"
                              arrow
                              placement="bottom"
                           >
                              <IconButton
                                 onClick={handleDeleteTask}
                                 aria-label="delete task"
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </Tooltip>
                        </div>
                     </div>
                     <Typography variant="body2" className={classes.time}>
                        {`Zadanie stworzone przez: ${manager?.name || ''} ${
                           manager?.surname || ''
                        }, ${createdFromNow}.`}
                     </Typography>
                     <Typography variant="body2" className={classes.time}>
                        {`Wykonawca zadania: ${employee?.name || ''} ${
                           employee?.surname || ''
                        }. Termin wykonania: ${executionDateFromNow}`}
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
