import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from './appointmentTooltip/ContentTooltip';
import { HeaderTooltip } from './appointmentTooltip/HeaderTooltip';

export const AccountEquipmentTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <Timetable
      data={data}
      status={status}
      fetchData={fetchData}
      fetchedDates={fetchedDates}
   >
      <AppointmentTooltip
         showCloseButton
         headerComponent={HeaderTooltip}
         contentComponent={ContentTooltip}
      />
   </Timetable>
);
