import React from 'react';
import {
   Grid,
   Paper,
   Typography,
   IconButton,
   Tooltip,
} from '@material-ui/core';
import { Check as CheckIcon, Clear as ClearIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import {
   selectById,
   acceptTask,
   declineTask,
} from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { useAuth } from 'src/main/auth';
import { useStyles } from './EmployeeTaskItem.styles';

const TASK_STATUS = {
   LOW: { id: 'LOW', pl: 'Niski' },
   MEDIUM: { id: 'MEDIUM', pl: 'Średni' },
   HIGH: { id: 'HIGH', pl: 'Wysoki' },
   CRITICAL: { id: 'CRITICAL', pl: 'Krytyczny' },
};

export const EmployeeTaskItem = ({ taskId = '' }) => {
   const dispatch = useDispatch();
   const classes = useStyles();
   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   const task = useSelector((state) => selectById(state, taskId));

   const {
      title = '',
      description = '',
      taskCreationDate = '',
      dueDate,
      employeeAccept = 'NO_ACTION',
      manager = {},

      priority = TASK_STATUS.LOW.id,
   } = task || {};

   let createdFromNow;

   try {
      createdFromNow = formatDistanceToNow(parseISO(taskCreationDate), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      createdFromNow = '';
   }

   let executionDateFromNow;
   try {
      executionDateFromNow = formatDistanceToNow(parseISO(dueDate), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      executionDateFromNow = '';
   }

   const handleAcceptTask = () =>
      dispatch(
         acceptTask({
            userId,
            taskId,
            token,
         }),
      );
   const handleDeclineTask = () =>
      dispatch(
         declineTask({
            userId,
            taskId,
            token,
         }),
      );

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
                        {employeeAccept === 'NO_ACTION' && (
                           <div>
                              <Tooltip
                                 title="Przyjmij zadanie"
                                 arrow
                                 placement="bottom"
                              >
                                 <IconButton
                                    onClick={handleAcceptTask}
                                    aria-label="accept task"
                                 >
                                    <CheckIcon />
                                 </IconButton>
                              </Tooltip>
                              <Tooltip
                                 title="Odrzuć zadanie"
                                 arrow
                                 placement="bottom"
                              >
                                 <IconButton
                                    onClick={handleDeclineTask}
                                    aria-label="decline task"
                                 >
                                    <ClearIcon />
                                 </IconButton>
                              </Tooltip>
                           </div>
                        )}
                     </div>
                     <Typography variant="body2" className={classes.time}>
                        {`Zadanie stworzone przez: ${manager?.name || ''} ${
                           manager?.surname || ''
                        }, ${createdFromNow}.`}
                     </Typography>
                     <Typography variant="body2" className={classes.time}>
                        {`Termin zakończenia zadania: ${executionDateFromNow}`}
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
