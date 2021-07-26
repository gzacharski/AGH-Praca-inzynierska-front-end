import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { IndividualWorkoutContextProvider } from 'src/main/components/timetable/userIndividualTimetable/IndividualWorkoutContex';
import { WorkoutRequestDialog } from 'src/main/components/dialogs';
import { UserIndividualContentTooltip } from './UserIndividualContentTooltip';
import { UserIndividualHeaderTooltip } from './UserIndividualHeaderTooltip';
import { CurrentDateContextProvider } from '../CurrentDateContext';
import { ToolbarButtons } from './ToolbarButtons';

export const UserIndividualTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <IndividualWorkoutContextProvider>
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
               headerComponent={UserIndividualHeaderTooltip}
               contentComponent={UserIndividualContentTooltip}
            />
         </Timetable>
         <WorkoutRequestDialog />
      </CurrentDateContextProvider>
   </IndividualWorkoutContextProvider>
);
