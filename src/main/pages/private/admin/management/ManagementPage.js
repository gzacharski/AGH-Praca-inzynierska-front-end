/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Typography, Grid, Paper } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { PageWrapper } from 'src/main/components/utils';
import { discoveryServiceURL } from 'src/main/data/urls';
import { useStyles } from './ManagementPage.styles';

const ManagementPage = () => {
   const classes = useStyles();
   const [applications, setApplications] = useState([]);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      axios
         .get(`${discoveryServiceURL}/admin/registry`, {
            headers: { Accept: 'application/json' },
         })
         .then((response) => {
            const { application = [] } = response?.data;
            setApplications(application);
         })
         .catch((error) => {
            const { message = '' } = error?.response?.data;
            enqueueSnackbar(message, {
               variant: 'error',
               anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
               },
            });
         });
   }, []);

   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Zarządzaj serwisami
         </Typography>
         <Grid container spacing={2}>
            {applications &&
               applications.map((application) => {
                  const { name = '', instance = [] } = application;

                  const instances = instance.map((serviceInstance) => {
                     const {
                        instanceId = '',
                        status = 'DOWN',
                        lastUpdatedTimestamp = 0,
                     } = serviceInstance;
                     const lastUpdatedTimestampParsed = formatDistanceToNow(
                        new Date(lastUpdatedTimestamp),
                        {
                           locale: pl,
                           addSuffix: true,
                        },
                     );
                     return (
                        <div key={instanceId}>
                           <Typography>{instanceId}</Typography>
                           <div>{status}</div>
                           <div>{lastUpdatedTimestampParsed}</div>
                        </div>
                     );
                  });

                  return (
                     <Grid item key={name}>
                        <Paper elevation={5} className={classes.paper}>
                           <Typography>{name}</Typography>
                           <div>{instances}</div>
                        </Paper>
                     </Grid>
                  );
               })}
         </Grid>
      </PageWrapper>
   );
};

export default ManagementPage;
