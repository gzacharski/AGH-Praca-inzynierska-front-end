import React from 'react';
import { Paper } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
   Scheduler,
   DayView,
   WeekView,
   Appointments,
   Toolbar,
   ViewSwitcher,
   DateNavigator,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useStyles } from './Timetable.styles';

export const Timetable = ({data, children}) => {
   const classes = useStyles();
   return (
      <Paper className={classes.paper}>
         <Scheduler data={data} locale="pl-PL" firstDayOfWeek={1}>
            <ViewState defaultCurrentViewName="Week" />
            <WeekView startDayHour={7} endDayHour={22} displayName="Tydzień" />
            <DayView startDayHour={7} endDayHour={22} displayName="Dzień" />
            <Toolbar/>
            <TodayButton messages={{ today: 'Dzisiaj' }} />
            <DateNavigator />
            <ViewSwitcher />
            <Appointments />
            {children}
         </Scheduler>
      </Paper>
   );
};
