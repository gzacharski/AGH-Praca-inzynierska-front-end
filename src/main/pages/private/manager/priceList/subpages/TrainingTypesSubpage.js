import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress, Paper } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { TrainingTypeTable } from 'src/main/components/tables';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectWorkouts,
   fetchWorkoutList,
} from 'src/main/store/sliceFiles/workoutSlice';

export const TrainingTypeSubpage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const trainingTypes = useSelector(selectWorkouts);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const auth = useAuth();
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(10);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = auth;
         dispatch(fetchWorkoutList({ pageNumber, pageSize, token }));
      }
   }, [status, dispatch]);

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

   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;

   return (
      <Paper>
         {shouldRenderProgress && <LinearProgress />}
         <TrainingTypeTable
            trainingTypes={trainingTypes}
            pageNumber={pageNumber}
            pageSize={pageSize}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
         />
      </Paper>
   );
};
