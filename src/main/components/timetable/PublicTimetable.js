import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from './appointmentTooltip/ContentTooltip';
import { HeaderTooltip } from './appointmentTooltip/HeaderTooltip';

export const PublicTimetable = ({ data, status, fetchData, fetchedDates }) => (
   <Timetable
      data={data}
      status={status}
      fetchData={fetchData}
      fetchedDates={fetchedDates}
   >
      <Toolbar />
      <TodayButton messages={{ today: 'Dzisiaj' }} />
      <Appointments />
      <AppointmentTooltip
         showCloseButton
         headerComponent={HeaderTooltip}
         contentComponent={ContentTooltip}
      />
   </Timetable>
);
