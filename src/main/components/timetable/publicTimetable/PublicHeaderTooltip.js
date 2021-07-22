/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import {
   IconButton,
   Tooltip,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import { isPast, isFuture, subDays } from 'date-fns';
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

const joinEventTooltipTitle = (startDate) => {
   if (isPast(Date.parse(startDate))) return 'Zajęcia już się odbyły.';
   if (isFuture(subDays(Date.parse(startDate), 7)))
      return 'Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć.';
   return 'Dołącz do zajęć.';
};

const useStyles = makeStyles({
   progress: {
      position: 'absolute',
      top: 3,
      right: 70,
      zIndex: 0,
   },
});

export const PublicHeaderTooltip = ({ appointmentData, ...restProps }) => {
   const history = useHistory();
   const auth = useAuth();
   const dispatch = useDispatch();
   const message = useSelector(selectMessage);
   const status = useSelector(selectStatus);
   const { enqueueSnackbar } = useSnackbar();
   const classes = useStyles();

   const { startDate, id } = appointmentData;

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

   const joinEventDisabled =
      isPast(Date.parse(startDate)) ||
      isFuture(subDays(Date.parse(startDate), 7));

   return (
      <AppointmentTooltip.Header
         {...restProps}
         appointmentData={appointmentData}
      >
         <Tooltip
            title={joinEventTooltipTitle(startDate)}
            arrow
            placement="bottom"
         >
            <div className={classes.wrapper}>
               <IconButton
                  aria-haspopup="true"
                  onClick={handleClick}
                  disabled={joinEventDisabled}
               >
                  <PersonAddIcon />
               </IconButton>
               {status === STATUS.LOADING && (
                  <CircularProgress size={45} className={classes.progress} />
               )}
            </div>
         </Tooltip>
      </AppointmentTooltip.Header>
   );
};
