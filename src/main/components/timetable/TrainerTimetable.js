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

export const TrainerTimetable = ({ data }) => (
   <Timetable data={data}>
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
