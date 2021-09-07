import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Grid } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { EmployeeTaskItem } from 'src/main/components/grid';
import { STATUS } from 'src/main/store';
import { NoAssignments } from 'src/main/components/noContent';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectIds,
   fetchEmployeeTaskList,
} from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { DialogContextProvider } from 'src/main/components/contexts/DialogContext';
import { useAuth } from 'src/main/auth';
import { DeleteGympassDialog } from 'src/main/components/dialogs';

const AccountPage = () => {
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
         const { token = '', userInfo = {} } = authState;
         const { userId = '' } = userInfo;
         dispatch(fetchEmployeeTaskList({ userId, token }));
      }
   }, [status, dispatch]);
   return (
      <PageWrapper>
         <PageTitle>Twoje zadania do wykonania</PageTitle>
         {taskIds.length !== 0 ? (
            <DialogContextProvider>
               <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                  direction="column"
               >
                  {taskIds.map((id) => (
                     <EmployeeTaskItem key={id} taskId={id} />
                  ))}
               </Grid>
               <DeleteGympassDialog />
            </DialogContextProvider>
         ) : (
            <NoAssignments />
         )}
      </PageWrapper>
   );
};

export default AccountPage;
