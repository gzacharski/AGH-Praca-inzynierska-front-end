/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { TaskItem } from 'src/main/components/grid/taskItem/TaskItem';

import { STATUS } from 'src/main/store';
import { NoAssignments } from 'src/main/components/noContent';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   fetchAllTaskList,
   selectIds,
} from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { useAuth } from 'src/main/auth';

const AccountPage = () => {
   const history = useHistory();
   const { authState = {} } = useAuth();

   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const taskIds = useSelector(selectIds);
   const message = useSelector(selectMessage);
   const variant = useSelector(selectNotistack);

   const { enqueueSnackbar } = useSnackbar();

   if (message) {
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = authState;
         dispatch(fetchAllTaskList({ token }));
      }
   }, [status, dispatch]);

   return (
      <PageWrapper>
         <PageTitle>Zadania pracowników</PageTitle>
         <Button
            variant="outlined"
            onClick={() => history.push('/manager/tasks/add')}
         >
            Dodaj nowe zadanie
         </Button>
         {taskIds.length !== 0 ? (
            <Grid
               container
               alignItems="center"
               justifyContent="center"
               spacing={3}
               direction="column"
            >
               {taskIds.map((id) => (
                  <TaskItem key={id} taskId={id} />
               ))}
            </Grid>
         ) : (
            <NoAssignments />
         )}
      </PageWrapper>
   );
};

export default AccountPage;
