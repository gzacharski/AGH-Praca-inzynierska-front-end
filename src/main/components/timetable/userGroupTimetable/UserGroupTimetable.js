import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from './ContentTooltip';
import { HeaderTooltip } from './HeaderTooltip';

export const UserGroupTimetable = ({
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
