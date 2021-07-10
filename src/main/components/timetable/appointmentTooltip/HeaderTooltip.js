import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export const HeaderTooltip = ({ appointmentData, ...restProps }) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton>
         <MoreVert />
      </IconButton>
   </AppointmentTooltip.Header>
);
