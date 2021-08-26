import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress, Paper } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { GympassTable } from 'src/main/components/tables';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchManagerGympassList,
} from 'src/main/store/sliceFiles/managerSlices/gympassSlice';

export const GympassesSubpage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const gympasses = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const variant = useSelector(selectNotistack);
   const auth = useAuth();

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = auth;
         dispatch(fetchManagerGympassList({ token }));
      }
   }, [status, dispatch]);

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

   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;

   return (
      <Paper>
         {shouldRenderProgress && <LinearProgress />}
         <GympassTable data={gympasses} />
      </Paper>
   );
};
