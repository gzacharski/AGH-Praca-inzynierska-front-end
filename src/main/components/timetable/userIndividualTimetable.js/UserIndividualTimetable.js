import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { UserIndividualContentTooltip } from './UserIndividualContentTooltip';
import { UserIndividualHeaderTooltip } from './UserIndividualHeaderTooltip';

export const UserIndividualTimetable = ({
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
         headerComponent={UserIndividualHeaderTooltip}
         contentComponent={UserIndividualContentTooltip}
      />
   </Timetable>
);
