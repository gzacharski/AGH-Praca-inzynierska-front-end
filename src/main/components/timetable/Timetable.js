/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Paper } from '@material-ui/core';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
   Scheduler,
   DayView,
   WeekView,
   Appointments,
   Toolbar,
   ViewSwitcher,
   DateNavigator,
   TodayButton,
   ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { formatDate, getEndOfWeek, getStartOfWeek } from 'src/main/utils';
import { useStyles } from './Timetable.styles';

const CustonDateNavigator = ({ children, ...restProps }) => (
   <DateNavigator.NavigationButton
      {...restProps}
      onClick={() => console.log('test')}
      type="back"
   >
      {children}
   </DateNavigator.NavigationButton>
);

export const Timetable = ({ data, children }) => {
   const classes = useStyles();
   return (
      <Paper className={classes.paper}>
         <Scheduler data={data} locale="pl-PL" firstDayOfWeek={1}>
            <ViewState
               defaultCurrentViewName="Week"
               onCurrentDateChange={(currentDate) => {
                  console.log(getStartOfWeek(currentDate));
                  console.log(formatDate(currentDate));
                  console.log(getEndOfWeek(currentDate));
               }}
            />
            <EditingState />
            <ConfirmationDialog />
            <WeekView startDayHour={7} endDayHour={22} displayName="Tydzień" />
            <DayView startDayHour={7} endDayHour={22} displayName="Dzień" />
            <Toolbar />
            <TodayButton messages={{ today: 'Dzisiaj' }} />
            <DateNavigator />
            <ViewSwitcher />
            <Appointments />
            {children}
         </Scheduler>
      </Paper>
   );
};
