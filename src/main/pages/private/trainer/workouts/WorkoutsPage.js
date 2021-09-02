import React, { useEffect } from 'react';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectAll,
   selectFetchedDates,
   fetchTrainerTrainings,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectMessage,
} from 'src/main/store/sliceFiles/trainerSlices/trainerTimetableSlice';
import { TrainerTimetable } from 'src/main/components/timetable';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';

const WorkoutsPage = () => {
   const data = useSelector(selectAll);
   const fetchedDates = useSelector(selectFetchedDates);
   const status = useSelector(selectStatus);
   const dispatch = useDispatch();
   const variant = useSelector(selectNotistack);
   const message = useSelector(selectMessage);

   const { authState = {} } = useAuth();
   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE && Boolean(userId)) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();
         if (fetchedDates[startOfWeek] !== endOfWeek) {
            dispatch(
               fetchTrainerTrainings({
                  userId,
                  startOfWeek,
                  endOfWeek,
                  token,
               }),
            );
         }
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

   return (
      <PageWrapper>
         <PageTitle>Aktualny grafik zajęć indywidualnych i grupowych</PageTitle>
         <TrainerTimetable
            data={data}
            fetchedDates={fetchedDates}
            fetchData={fetchTrainerTrainings}
            status={status}
         />
      </PageWrapper>
   );
};

export default WorkoutsPage;
