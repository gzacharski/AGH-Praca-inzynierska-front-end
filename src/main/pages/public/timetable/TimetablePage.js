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
   selectError,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { useAuth } from 'src/main/auth';
import { STATUS } from 'src/main/store';

const variantFn = (dataStatus, error) => {
   if (dataStatus === STATUS.SUCCEEDED) return 'success';
   const { status = 0 } = error;

   if (status === 404) return 'info';
   return 'error';
};

const TimetablePage = () => {
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   const dataStatus = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const fetchedDates = useSelector(selectFetchedDates);
   const error = useSelector(selectError);
   const { enqueueSnackbar } = useSnackbar();
   const { isAuthenticated, authState = {} } = useAuth();
   const { token } = authState;

   const fetchData = isAuthenticated()
      ? fetchPrivateTimetableData
      : fetchPublicTimetableData;

   useEffect(() => {
      if (dataStatus === STATUS.IDLE) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();
         if (fetchedDates[startOfWeek] !== endOfWeek) {
            dispatch(fetchData({ startOfWeek, endOfWeek, token }));
         }
      }
   }, [dataStatus, dispatch]);

   if (message) {
      const variant = variantFn(dataStatus, error);
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
            fetchData={fetchData}
            fetchedDates={fetchedDates}
         />
      </PageWrapper>
   );
};

export default TimetablePage;
