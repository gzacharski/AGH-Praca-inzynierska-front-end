import React from 'react';
import { Grid, Paper, Typography, makeStyles, Slider } from '@material-ui/core';
import {
   ArgumentAxis,
   ValueAxis,
   Chart,
   BarSeries,
   Title,
   Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker, Stack } from '@devexpress/dx-react-chart';
import { formatISO9075, formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'src/main/store/sliceFiles/accountSlice';
import { PageWrapper } from 'src/main/components/utils';
import { AvatarIcon } from 'src/main/components/icons';

const data = [
   { workoutType: 'Sztangi', percentage: 30 },
   { workoutType: 'TRX', percentage: 20 },
   { workoutType: 'Rowery', percentage: 11 },
   { workoutType: 'Pilates', percentage: 39 },
   { workoutType: 'ABS', percentage: 2 },
];

const gympass = {
   startDate: '2021-07-20T20:11',
   endDate: '2021-08-20T20:11',
};

const event = {
   id: 'dfdfd',
   title: 'Pilates',
   startDate: '2021-07-31T12:00',
   endDate: '2021-07-31T13:30',
   location: 'Sala nr 2',
};

const useStyles = makeStyles(({ spacing }) => ({
   paper: {
      minHeight: '150px',
      padding: spacing(2),
   },
   paper2: {
      padding: spacing(2),
      maxWidth: '350px',
   },
   stats: {
      minHeight: '350px',
   },
   user: {
      display: 'flex',
   },
   avatar: {
      marginLeft: spacing(1),
      marginRight: spacing(1),
   },
   info: {
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
   },
}));

const AccountPage = () => {
   const classes = useStyles();
   const startDate = Date.parse(gympass.startDate);
   const endDate = Date.parse(gympass.endDate);
   const currentDate = Date.now();
   const user = useSelector(selectUserInfo);
   const { name, surname, email, phone } = user;

   const value = ((currentDate - startDate) * 100) / (endDate - startDate);

   let closestWorkout;
   try {
      closestWorkout = formatDistanceToNow(Date.parse(event.startDate), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      closestWorkout = '';
   }

   return (
      <PageWrapper>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <Paper elevation={3} className={classes.paper}>
                        <div className={classes.user}>
                           <div className={classes.avatar}>
                              <AvatarIcon huge />
                           </div>
                           <div className={classes.info}>
                              <Typography variant="h6">
                                 {name} {surname}
                              </Typography>
                              <Typography variant="body2">{phone}</Typography>
                              <Typography variant="body2">{email}</Typography>
                           </div>
                        </div>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6">Karnet</Typography>
                        <Slider value={value} track="inverted" />
                        <Typography>Typ: standardowy</Typography>
                        <Typography>
                           Kończy się: {formatISO9075(endDate)}
                        </Typography>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6">
                           Najbliższe wydarzenie
                        </Typography>
                        <Paper className={classes.paper2}>
                           <Typography variant="h6">{event.title}</Typography>
                           <Typography variant="body1">
                              {event.location}, {closestWorkout}
                           </Typography>
                        </Paper>
                     </Paper>
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={classes.stats}>
               <Paper elevation={3}>
                  <Chart data={data}>
                     <ArgumentAxis />
                     <ValueAxis />
                     <BarSeries
                        argumentField="workoutType"
                        valueField="percentage"
                     />
                     <Title text="Twój udział w zajęciach" />
                     <Animation />
                     <EventTracker />
                     <Tooltip />
                     <Stack />
                  </Chart>
               </Paper>
            </Grid>
         </Grid>
      </PageWrapper>
   );
};

export default AccountPage;
