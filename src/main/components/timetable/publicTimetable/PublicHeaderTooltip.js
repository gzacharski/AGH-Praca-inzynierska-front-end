/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Tooltip } from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import { isPast, isFuture, subDays } from 'date-fns';
import { useAuth } from 'src/main/auth';

const joinEventTooltipTitle = (startDate) => {
   if (isPast(Date.parse(startDate))) return 'Zajęcia już się odbyły.';
   if (isFuture(subDays(Date.parse(startDate), 7)))
      return 'Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć.';
   return 'Dołącz do zajęć.';
};

export const PublicHeaderTooltip = ({ appointmentData, ...restProps }) => {
   const history = useHistory();
   const auth = useAuth();

   const handleClick = () => {
      console.log(appointmentData);
      if (auth.isAuthenticated()) {
         console.log(history);
      } else {
         history.push('/login?redirect=/timetable');
      }
   };
   const { startDate } = appointmentData;
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
            <div>
               <IconButton
                  aria-haspopup="true"
                  onClick={handleClick}
                  disabled={joinEventDisabled}
               >
                  <PersonAddIcon />
               </IconButton>
            </div>
         </Tooltip>
      </AppointmentTooltip.Header>
   );
};
