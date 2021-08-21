import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   clearMessage,
   fetchUserIndividualReservation,
   selectData,
   selectFetchedDates,
   selectMessage,
   selectStatus,
   selectNotistack,
} from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { UserIndividualTimetable } from 'src/main/components/timetable/userIndividualTimetable/UserIndividualTimetable';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';

const UserIndividualWorkoutPage = () => {
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const fetchedDates = useSelector(selectFetchedDates);
   const notistackVariant = useSelector(selectNotistack);
   const context = useAuth();

   const { userInfo = {}, token = '' } = context.authState;
   const { userId = '' } = userInfo;

   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE && Boolean(userId)) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();
         if (fetchedDates[startOfWeek] !== endOfWeek) {
            dispatch(
               fetchUserIndividualReservation({
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
         variant: notistackVariant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   return (
      <PageWrapper>
         <PageTitle>Twoje rezerwacje zajęć indywidualnych</PageTitle>
         <UserIndividualTimetable
            data={data}
            status={status}
            fetchData={fetchUserIndividualReservation}
            fetchedDates={fetchedDates}
         />
      </PageWrapper>
   );
};

export default UserIndividualWorkoutPage;
