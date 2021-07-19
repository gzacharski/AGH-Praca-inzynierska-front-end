/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';
import { Timetable } from 'src/main/components/timetable';
import { UserIndividualContentTooltip } from './UserIndividualContentTooltip';
import { UserIndividualHeaderTooltip } from './UserIndividualHeaderTooltip';
import { IndividualWorkoutContextProvider } from './IndividualWorkoutContex';

const ToolbarButtons = ({ ...restProps }) => (
   <Toolbar.FlexibleSpace {...restProps}>
      <Button variant="contained">Test</Button>
   </Toolbar.FlexibleSpace>
);

export const UserIndividualTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <IndividualWorkoutContextProvider>
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
   </IndividualWorkoutContextProvider>
);
