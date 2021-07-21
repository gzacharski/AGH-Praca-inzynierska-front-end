import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { PublicTimetable } from 'src/main/components/timetable';
import {
   clearMessage,
   fetchPublicTimetableData,
   fetchPrivateTimetableData,
   selectData,
   selectFetchedDates,
   selectMessage,
   selectStatus,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { useAuth } from 'src/main/auth';
import { STATUS } from 'src/main/store';

const TimetablePage = () => {
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   const dataStatus = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const fetchedDates = useSelector(selectFetchedDates);
   const { enqueueSnackbar } = useSnackbar();
   const auth = useAuth();

   useEffect(() => {
      if (dataStatus === STATUS.IDLE) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();

         if (fetchedDates[startOfWeek] !== endOfWeek) {
            if (auth.isAuthenticated()) {
               dispatch(fetchPrivateTimetableData({ startOfWeek, endOfWeek }));
            } else {
               dispatch(fetchPublicTimetableData({ startOfWeek, endOfWeek }));
            }
         }
      }
   }, [dataStatus, dispatch]);

   if (message) {
      const variant = dataStatus === STATUS.SUCCEEDED ? 'success' : 'error';
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
         <PublicPageTitle
            header="Grafik zajęć"
            subheader="Aktualny plan treningów w bieżącym tygodniu"
         />
         <PublicTimetable
            data={data}
            status={dataStatus}
            fetchData={fetchPublicTimetableData}
            fetchedDates={fetchedDates}
         />
      </PageWrapper>
   );
};

export default TimetablePage;
