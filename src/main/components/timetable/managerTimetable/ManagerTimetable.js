import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import {
   AddWorkoutDialog,
   EditWorkoutDialog,
   DeleteWorkoutDialog,
} from 'src/main/components/dialogs/workout';
import { DialogContextProvider } from 'src/main/components/contexts/DialogContext';
import { ManagerContentTooltip } from './ManagerContentTooltip';
import { ManagerHeaderTooltip } from './ManagerHeaderTooltip';
import { ToolbarButtons } from './ToolbarButtons';
import { CurrentDateContextProvider } from '../CurrentDateContext';

export const ManagerTimetable = ({ data, status, fetchData, fetchedDates }) => (
   <DialogContextProvider>
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
               headerComponent={ManagerHeaderTooltip}
               contentComponent={ManagerContentTooltip}
            />
         </Timetable>
         <AddWorkoutDialog />
         <EditWorkoutDialog />
         <DeleteWorkoutDialog />
      </CurrentDateContextProvider>
   </DialogContextProvider>
);
