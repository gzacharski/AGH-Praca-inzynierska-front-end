import React from 'react';
import faker from 'faker';
import { Grid, Paper } from '@material-ui/core';
import {
   ArgumentAxis,
   ValueAxis,
   Chart,
   LineSeries,
   Title,
   Tooltip,
   ZoomAndPan,
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
                     <Title text="Liczba osób zarejestrowanych w ciągu ostatniego tygodnia" />
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
