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
import { TrainerContentTooltip } from './TrainerContentTooltip';
import { TrainerHeaderTooltip } from './TrainerHeaderTooltip';
import { ToolbarButtons } from './ToolbarButtons';
import { CurrentDateContextProvider } from '../CurrentDateContext';

export const TrainerTimetable = ({ data, status, fetchData, fetchedDates }) => (
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
               headerComponent={TrainerHeaderTooltip}
               contentComponent={TrainerContentTooltip}
            />
         </Timetable>
         <AddWorkoutDialog />
         <EditWorkoutDialog />
         <DeleteWorkoutDialog />
      </CurrentDateContextProvider>
   </DialogContextProvider>
);
