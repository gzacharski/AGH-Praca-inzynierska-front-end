import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { UserGroupContentTooltip } from './UserGroupContentTooltip';
import { UserGroupHeaderTooltip } from './UserGroupHeaderTooltip';
import { CurrentDateContextProvider } from '../CurrentDateContext';
import { ToolbarButtons } from './ToolbarButtons';

export const UserGroupTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <CurrentDateContextProvider>
      <Timetable
         data={data}
         status={status}
         fetchData={fetchData}
         fetchedDates={fetchedDates}
      >
         <Toolbar flexibleSpaceComponent={ToolbarButtons} />
         <TodayButton messages={{ today: 'Dzisiaj' }} />
         <Appointments />
         <AppointmentTooltip
            showCloseButton
            headerComponent={UserGroupHeaderTooltip}
            contentComponent={UserGroupContentTooltip}
         />
      </Timetable>
   </CurrentDateContextProvider>
);
