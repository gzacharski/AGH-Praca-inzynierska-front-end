import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
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
import {
   fetchUserStats,
   selectData,
   selectMessage,
   selectNotistack,
   clearMessage,
   selectStatus,
} from 'src/main/store/sliceFiles/adminSlices/statsSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './StatisticsPage.styles';

const StatisticsPage = () => {
   const classes = useStyles;
   const dispatch = useDispatch();
   const data = useSelector(selectData);
   const message = useSelector(selectMessage);
   const variant = useSelector(selectNotistack);
   const status = useSelector(selectStatus);
   const { enqueueSnackbar } = useSnackbar();
   const { authState = {} } = useAuth();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = authState;
         dispatch(fetchUserStats({ token }));
      }
   }, [data]);

   if (message) {
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   return (
      <PageWrapper>
         <PageTitle>Statystyki administratora</PageTitle>
         <Grid container spacing={3}>
            <Grid item xs={12} className={classes.stats}>
               <Paper elevation={3}>
                  <Chart data={data || []}>
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
