import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from './appointmentTooltip/ContentTooltip';
import { HeaderTooltip } from './appointmentTooltip/HeaderTooltip';

export const AccountIndividualTimetable = ({ data }) => (
   <Timetable data={data}>
      <AppointmentTooltip
         showCloseButton
         headerComponent={HeaderTooltip}
         contentComponent={ContentTooltip}
      />
   </Timetable>
);
