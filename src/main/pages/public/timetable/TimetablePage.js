import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { PublicTimetable } from 'src/main/components/timetable';
import {
   clearMessage,
   fetchPublicTimetableData,
   selectData,
   selectFetchedDates,
   selectMessage,
   selectStatus,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { getCurrentEndOfWeek, getCurrentStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';

const TimetablePage = () => {
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   const dataStatus = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const fetchedDates = useSelector(selectFetchedDates);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (dataStatus === STATUS.IDLE) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();
         if (fetchedDates[startOfWeek] !== endOfWeek) {
            dispatch(fetchPublicTimetableData({ startOfWeek, endOfWeek }));
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
         <PageTitle>Aktualny grafik zajęć</PageTitle>
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
