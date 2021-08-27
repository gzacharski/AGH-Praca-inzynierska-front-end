import React, { useContext } from 'react';
import { Dialog } from '@material-ui/core';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { ManagerContentTooltip } from './ManagerContentTooltip';
import { ManagerHeaderTooltip } from './ManagerHeaderTooltip';
import { ToolbarButtons } from './ToolbarButtons';
import { CurrentDateContextProvider } from '../CurrentDateContext';
import {
   ManagerWorkoutContextProvider,
   ManagerWorkoutContext,
} from './ManagerWorkoutContext';

const ManagerDialog = () => {
   const { openDialog, setOpenDialog } = useContext(ManagerWorkoutContext);
   return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
         Test
      </Dialog>
   );
};

export const ManagerTimetable = ({ data, status, fetchData, fetchedDates }) => (
   <ManagerWorkoutContextProvider>
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
         <ManagerDialog />
      </CurrentDateContextProvider>
   </ManagerWorkoutContextProvider>
);
