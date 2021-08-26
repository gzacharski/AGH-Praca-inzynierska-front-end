import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { PublicTimetable } from 'src/main/components/timetable';
import {
   clearMessage,
   fetchPrivateTimetableData,
   selectData,
   selectFetchedDates,
   selectMessage,
   selectStatus,
   selectNotistack,
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
   const variant = useSelector(selectNotistack);
   const { enqueueSnackbar } = useSnackbar();
   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   useEffect(() => {
      if (dataStatus === STATUS.IDLE) {
         const startOfWeek = getCurrentStartOfWeek();
         const endOfWeek = getCurrentEndOfWeek();
         if (fetchedDates[startOfWeek] !== endOfWeek) {
            dispatch(
               fetchPrivateTimetableData({ startOfWeek, endOfWeek, token }),
            );
         }
      }
   }, [dataStatus, dispatch]);

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
         <PageTitle>Modyfikuj ofertę</PageTitle>
         <PublicTimetable
            data={data}
            status={dataStatus}
            fetchData={fetchPrivateTimetableData}
            fetchedDates={fetchedDates}
         />
      </PageWrapper>
   );
};

export default TimetablePage;
