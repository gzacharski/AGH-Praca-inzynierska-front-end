/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { useSnackbar } from 'notistack';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export const HeaderTooltip = ({ appointmentData, ...restProps }) => {
   const { enqueueSnackbar } = useSnackbar();
   return (
      <AppointmentTooltip.Header
         {...restProps}
         appointmentData={appointmentData}
      >
         <IconButton
            onClick={() =>
               enqueueSnackbar(JSON.stringify(appointmentData), {
                  variant: 'success',
                  anchorOrigin: {
                     vertical: 'bottom',
                     horizontal: 'right',
                  },
               })
            }
         >
            <MoreVert />
         </IconButton>
      </AppointmentTooltip.Header>
   );
};
