import React from 'react';
import { Paper, LinearProgress } from '@material-ui/core';
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
import { useDispatch } from 'react-redux';
import { getEndOfWeek, getStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { useStyles } from './Timetable.styles';

export const Timetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
   children,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;
   return (
      <Paper className={classes.paper}>
         {shouldRenderProgress && <LinearProgress />}
         <Scheduler data={data} locale="pl-PL" firstDayOfWeek={1}>
            <ViewState
               defaultCurrentViewName="Week"
               onCurrentDateChange={(currentDate) => {
                  const startOfWeek = getStartOfWeek(currentDate);
                  const endOfWeek = getEndOfWeek(currentDate);
                  if (fetchedDates[startOfWeek] !== endOfWeek) {
                     dispatch(fetchData({ startOfWeek, endOfWeek }));
                  }
               }}
            />
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
