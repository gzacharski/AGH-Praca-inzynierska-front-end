import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   clearMessage,
   fetchUserIndividualReservation,
   selectData,
   selectFetchedDates,
   selectMessage,
   selectStatus,
} from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { AccountIndividualTimetable } from 'src/main/components/timetable/AccountIndividualTimetable';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { AuthContext } from 'src/main/auth';

const SettingsPage = () => {
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const fetchedDates = useSelector(selectFetchedDates);
   const context = useContext(AuthContext);

   const { userInfo = {} } = context.authState;
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
               }),
            );
         }
      }
   }, [status, dispatch]);

   if (message) {
      const variant = status === STATUS.SUCCEEDED ? 'success' : 'error';
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
         <PageTitle>Twoje rezerwacje zajęć indywidualnych</PageTitle>
         <AccountIndividualTimetable
            data={data}
            status={status}
            fetchData={fetchUserIndividualReservation}
            fetchedDates={fetchedDates}
         />
      </PageWrapper>
   );
};

export default SettingsPage;
