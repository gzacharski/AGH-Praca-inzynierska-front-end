/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   selectMessage,
   selectStatus,
   clearMessage,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { STATUS } from 'src/main/store';
import {
   AcceptRequestIconButton,
   RejectRequestIconButton,
} from 'src/main/components/buttons';

export const TrainerHeaderTooltip = ({ appointmentData, ...restProps }) => {
   const dispatch = useDispatch();
   const message = useSelector(selectMessage);
   const status = useSelector(selectStatus);
   const { enqueueSnackbar } = useSnackbar();
   const { setIdAndOpenDialog } = useContext(DialogContext);

   const {
      startDate = '',
      id = '',
      groupTraining = false,
      accepted = false,
   } = appointmentData || {};

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
         {!groupTraining && (
            <>
               <AcceptRequestIconButton
                  status={status}
                  onClick={() =>
                     setIdAndOpenDialog({ id, mode: DIALOG_MODE.ACCEPT })
                  }
                  startDate={startDate}
                  disabled={accepted}
                  accepted={accepted}
               />
               {!accepted && (
                  <RejectRequestIconButton
                     status={status}
                     onClick={() =>
                        setIdAndOpenDialog({ id, mode: DIALOG_MODE.REJECT })
                     }
                     startDate={startDate}
                  />
               )}
            </>
         )}
      </AppointmentTooltip.Header>
   );
};
