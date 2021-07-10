/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
   Paper,
   Typography,
   IconButton,
   Grid,
   withStyles,
   Link,
} from '@material-ui/core';
import { MoreVert, Room } from '@material-ui/icons';
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
   AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './TimetablePage.styles';

const schedulerData = [
   {
      id: 'testid',
      title: 'Joga',
      startDate: '2021-07-10T09:45',
      endDate: '2021-07-10T11:00',
      location: 'Sala nr 1',
      allDay: false,
   },
   {
      id: 'testid2',
      title: 'Pilates',
      startDate: '2021-07-04T12:00',
      endDate: '2021-07-04T13:30',
      location: 'Sala nr 2',
      allDay: false,
   },
   {
      id: 'testid3',
      title: 'Rowery',
      startDate: '2021-07-09T13:00',
      endDate: '2021-07-09T15:30',
      allDay: false,
   },
   {
      id: 'testid4',
      title: 'TRX',
      startDate: '2021-07-06T14:00',
      endDate: '2021-07-06T15:00',
      location: 'Przed budynkiem',
      allDay: false,
   },
];

const style = ({ palette }) => ({
   icon: {
      color: palette.action.active,
   },
   textCenter: {
      textAlign: 'center',
   },
});

const Header = ({ appointmentData, ...restProps }) => (
   <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton>
         <MoreVert />
      </IconButton>
   </AppointmentTooltip.Header>
);

const Content = withStyles(style)(
   ({ appointmentData, classes, ...restProps }) => {
      const { location } = appointmentData;
      return (
         <AppointmentTooltip.Content
            {...restProps}
            appointmentData={appointmentData}
         >
            {location && (
               <Grid container alignItems="center">
                  <Grid item xs={2} className={classes.textCenter}>
                     <Room className={classes.icon} />
                  </Grid>
                  <Grid item xs={10}>
                     <Link href="#" color="inherit">
                        {location}
                     </Link>
                  </Grid>
               </Grid>
            )}
         </AppointmentTooltip.Content>
      );
   },
);

export default function News() {
   const classes = useStyles();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Aktualny grafik zajęć
         </Typography>
         <Paper className={classes.paper}>
            <Scheduler data={schedulerData} locale="pl-PL" firstDayOfWeek={1}>
               <ViewState defaultCurrentViewName="Week" />
               <WeekView
                  startDayHour={9}
                  endDayHour={22}
                  displayName="Tydzień"
               />
               <DayView startDayHour={9} endDayHour={22} displayName="Dzień" />
               <Toolbar />
               <TodayButton messages={{ today: 'Dzisiaj' }} />
               <DateNavigator />
               <ViewSwitcher />
               <Appointments />
               <AppointmentTooltip
                  showCloseButton
                  headerComponent={Header}
                  contentComponent={Content}
               />
            </Scheduler>
         </Paper>
      </PageWrapper>
   );
}
