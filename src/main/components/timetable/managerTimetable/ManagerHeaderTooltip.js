import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   selectMessage,
   selectStatus,
   enrollToGroupTraining,
   clearMessage,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import {
   EditEventIconButton,
   RemoveEventIconButton,
} from 'src/main/components/buttons';

export const ManagerHeaderTooltip = ({ appointmentData, ...restProps }) => {
   const history = useHistory();
   const auth = useAuth();
   const dispatch = useDispatch();
   const message = useSelector(selectMessage);
   const status = useSelector(selectStatus);
   const { enqueueSnackbar } = useSnackbar();

   const { startDate, id } = appointmentData;

   // eslint-disable-next-line no-unused-vars
   const handleClick = () => {
      if (auth.isAuthenticated()) {
         const { authState = {} } = auth;
         const { userInfo = {}, token = '' } = authState;
         const { userId = '' } = userInfo;

         dispatch(enrollToGroupTraining({ trainingId: id, userId, token }));
      } else {
         history.push('/login?redirect=/timetable');
      }
   };

   useEffect(() => {
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
   }, [message, status, dispatch]);

   return (
      <AppointmentTooltip.Header
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...restProps}
         appointmentData={appointmentData}
      >
         <EditEventIconButton
            status={status}
            onClick={() => console.log(appointmentData)}
            startDate={startDate}
         />
         <RemoveEventIconButton
            status={status}
            onClick={() => console.log(appointmentData)}
            startDate={startDate}
         />
      </AppointmentTooltip.Header>
   );
};
