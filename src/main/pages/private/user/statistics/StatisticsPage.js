import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import {
   ArgumentAxis,
   ValueAxis,
   Chart,
   PieSeries,
   LineSeries,
   Title,
   Tooltip,
   Legend,
   ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';
import { PageWrapper, PageTitle } from 'src/main/components/utils';

const data = [
   { workoutType: 'Sztangi', percentage: 30.4 },
   { workoutType: 'TRX', percentage: 20.0 },
   { workoutType: 'Rowery', percentage: 10.3 },
   { workoutType: 'Pilates', percentage: 39.3 },
   { workoutType: 'ABS', percentage: 0 },
];

const calendarData = [
   { date: '2020-07-21', duration: 62 },
   { date: '2020-07-22', duration: 110 },
   { date: '2020-07-23', duration: 0 },
   { date: '2020-07-24', duration: 70 },
   { date: '2020-07-25', duration: 80 },
   { date: '2020-07-26', duration: 62 },
   { date: '2020-07-27', duration: 120 },
   { date: '2020-07-28', duration: 50 },
   { date: '2020-07-29', duration: 70 },
   { date: '2020-07-30', duration: 80 },
   { date: '2020-07-31', duration: 80 },
];

const SettingsPage = () => (
   <PageWrapper>
      <PageTitle>Statystyki</PageTitle>
      <Grid container justifyContent="center" spacing={4}>
         <Grid item xs={8}>
            <Paper>
               <Chart data={data}>
                  <PieSeries
                     argumentField="workoutType"
                     valueField="percentage"
                  />
                  <Title text="Procentowy udział w zajęciach" />
                  <Legend position="right" />
                  <Animation />
                  <EventTracker />
                  <Tooltip />
               </Chart>
            </Paper>
         </Grid>
         <Grid item xs={8}>
            <Paper>
               <Chart data={calendarData}>
                  <ArgumentAxis />
                  <ValueAxis />
                  <LineSeries argumentField="date" valueField="duration" />
                  <Title text="Czas spędzony na siłowni" />
                  <Animation />
                  <EventTracker />
                  <ZoomAndPan />
                  <Tooltip />
               </Chart>
            </Paper>
         </Grid>
      </Grid>
   </PageWrapper>
);

export default SettingsPage;
