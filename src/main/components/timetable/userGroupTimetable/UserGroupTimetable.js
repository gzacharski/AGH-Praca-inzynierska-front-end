import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { UserGroupContentTooltip } from './UserGroupContentTooltip';
import { UserGroupHeaderTooltip } from './UserGroupHeaderTooltip';

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
         headerComponent={UserGroupHeaderTooltip}
         contentComponent={UserGroupContentTooltip}
         onVisibilityChange={() => console.log('Visibility test')}
      />
   </Timetable>
);
