import React from 'react';
import faker from 'faker';
import { Grid, Paper } from '@material-ui/core';
import {
   ArgumentAxis,
   ValueAxis,
   Chart,
   BarSeries,
   LineSeries,
   Title,
   Tooltip,
   ZoomAndPan,
   SplineSeries,
   Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker, Stack } from '@devexpress/dx-react-chart';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { useStyles } from './StatisticsPage.styles';

const newUsers = [
   { day: '2020-10-01', quantity: faker.datatype.number(100) },
   { day: '2020-10-02', quantity: faker.datatype.number(100) },
   { day: '2020-10-03', quantity: faker.datatype.number(100) },
   { day: '2020-10-04', quantity: faker.datatype.number(100) },
   { day: '2020-10-05', quantity: faker.datatype.number(100) },
   { day: '2020-10-06', quantity: faker.datatype.number(100) },
   { day: '2020-10-07', quantity: faker.datatype.number(100) },
   { day: '2020-10-08', quantity: faker.datatype.number(100) },
   { day: '2020-10-09', quantity: faker.datatype.number(100) },
   { day: '2020-10-10', quantity: faker.datatype.number(100) },
   { day: '2020-10-11', quantity: faker.datatype.number(100) },
   { day: '2020-10-12', quantity: faker.datatype.number(100) },
   { day: '2020-10-13', quantity: faker.datatype.number(100) },
   { day: '2020-10-14', quantity: faker.datatype.number(100) },
   { day: '2020-10-15', quantity: faker.datatype.number(100) },
   { day: '2020-10-16', quantity: faker.datatype.number(100) },
   { day: '2020-10-17', quantity: faker.datatype.number(100) },
   { day: '2020-10-18', quantity: faker.datatype.number(100) },
   { day: '2020-10-19', quantity: faker.datatype.number(100) },
   { day: '2020-10-20', quantity: faker.datatype.number(100) },
   { day: '2020-10-21', quantity: faker.datatype.number(100) },
   { day: '2020-10-22', quantity: faker.datatype.number(100) },
   { day: '2020-10-23', quantity: faker.datatype.number(100) },
   { day: '2020-10-24', quantity: faker.datatype.number(100) },
   { day: '2020-10-25', quantity: faker.datatype.number(100) },
   { day: '2020-10-26', quantity: faker.datatype.number(100) },
   { day: '2020-10-27', quantity: faker.datatype.number(100) },
   { day: '2020-10-28', quantity: faker.datatype.number(100) },
   { day: '2020-10-29', quantity: faker.datatype.number(100) },
   { day: '2020-10-30', quantity: faker.datatype.number(100) },
   { day: '2020-10-31', quantity: faker.datatype.number(100) },
];

const data = [
   {
      day: '2020-10-01',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-02',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-03',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-04',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-05',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-06',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-07',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-08',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-09',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-10',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-11',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-12',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-13',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-14',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-15',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-16',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-17',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-18',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-19',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-20',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-21',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-22',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-23',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-24',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-25',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-26',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-27',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-28',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-29',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-30',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
   {
      day: '2020-10-31',
      quantity: faker.datatype.number(60),
      quantityMale: faker.datatype.number(60),
      quantityFemale: faker.datatype.number(60),
   },
];

const StatisticsPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <PageTitle>Statystyki administratora</PageTitle>
         <Grid container spacing={3}>
            <Grid item xs={12} className={classes.stats}>
               <Paper elevation={3}>
                  <Chart data={newUsers}>
                     <ArgumentAxis />
                     <ValueAxis />
                     <LineSeries argumentField="day" valueField="quantity" />
                     <Title text="Liczba osób zarejestrowanych w ciągu ostatniego miesiąca" />
                     <Animation />
                     <EventTracker />
                     <Tooltip />
                     <Stack />
                     <ZoomAndPan />
                  </Chart>
               </Paper>
            </Grid>
            <Grid item xs={12} className={classes.stats}>
               <Paper elevation={3}>
                  <Chart data={data}>
                     <ArgumentAxis />
                     <ValueAxis />
                     <BarSeries
                        argumentField="day"
                        valueField="quantity"
                        name="Wszyscy"
                     />
                     <SplineSeries
                        argumentField="day"
                        valueField="quantityMale"
                        name="Mężczyźni"
                     />
                     <SplineSeries
                        argumentField="day"
                        valueField="quantityFemale"
                        name="Kobiety"
                     />
                     <Legend />
                     <Title text="Czas spędzony w serwisie w ciągu dnia" />
                     <Animation />
                     <EventTracker />
                     <Tooltip />
                     <Stack />
                     <ZoomAndPan />
                  </Chart>
               </Paper>
            </Grid>
         </Grid>
      </PageWrapper>
   );
};

export default StatisticsPage;
