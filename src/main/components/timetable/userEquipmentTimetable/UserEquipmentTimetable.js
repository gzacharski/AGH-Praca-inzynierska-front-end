import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timetable } from 'src/main/components/timetable';
import { EquipmentRequestDialog } from 'src/main/components/dialogs';
import { UserEquipmentHeaderTooltip } from './UserEquipmentHeaderTooltip';
import { CurrentDateContextProvider } from '../CurrentDateContext';
import { UserEquipmentContextProvider } from './UserEquipmentContext';
import { ToolbarButtons } from './ToolbarButtons';

export const UserEquipmentTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <UserEquipmentContextProvider>
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
               headerComponent={UserEquipmentHeaderTooltip}
            />
         </Timetable>
         <EquipmentRequestDialog />
      </CurrentDateContextProvider>
   </UserEquipmentContextProvider>
);
