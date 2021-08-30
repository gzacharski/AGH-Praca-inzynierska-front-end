import React, { useContext } from 'react';
import { Paper, LinearProgress } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
   Scheduler,
   DayView,
   WeekView,
   ViewSwitcher,
   DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useDispatch } from 'react-redux';
import { getEndOfWeek, getStartOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './Timetable.styles';
import { CurrentDateContext } from './CurrentDateContext';

export const Timetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
   children,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { setCurrentDate } = useContext(CurrentDateContext);
   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;
   const { authState = {} } = useAuth();
   return (
      <Paper className={classes.paper}>
         {shouldRenderProgress && <LinearProgress />}
         <Scheduler data={data} locale="pl-PL" firstDayOfWeek={1}>
            <ViewState
               defaultCurrentViewName="Week"
               onCurrentDateChange={(currentDate) => {
                  setCurrentDate(currentDate);
                  const startOfWeek = getStartOfWeek(currentDate);
                  const endOfWeek = getEndOfWeek(currentDate);
                  if (fetchedDates[startOfWeek] !== endOfWeek) {
                     const { token = '', userInfo = {} } = authState;
                     const { userId = '' } = userInfo;
                     dispatch(
                        fetchData({ userId, startOfWeek, endOfWeek, token }),
                     );
                  }
               }}
            />
            <WeekView startDayHour={7} endDayHour={22} displayName="Tydzień" />
            <DayView startDayHour={7} endDayHour={22} displayName="Dzień" />
            {children}
            <DateNavigator />
            <ViewSwitcher />
         </Scheduler>
      </Paper>
   );
};
