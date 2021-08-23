import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Typography, Grid, Paper, Tooltip } from '@material-ui/core';
import {
   ArrowDownwardOutlined as ArrowDownwardIcon,
   ArrowUpwardOutlined as ArrowUpwardIcon,
} from '@material-ui/icons';
import { formatDistanceToNow, format } from 'date-fns';
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
            const apps = response?.data || [];
            setApplications(apps);
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
                        healthCheckUrl = '',
                     } = serviceInstance;
                     const lastUpdatedTimestampParsed = formatDistanceToNow(
                        new Date(lastUpdatedTimestamp),
                        {
                           locale: pl,
                           addSuffix: true,
                        },
                     );
                     return (
                        <div
                           key={instanceId}
                           className={classes.singleInstance}
                        >
                           <div style={{ display: 'inline-flex' }}>
                              {status === 'UP' ? (
                                 <Tooltip
                                    title="Aktywny"
                                    arrow
                                    placement="left"
                                 >
                                    <ArrowUpwardIcon
                                       className={classes.instanceUp}
                                    />
                                 </Tooltip>
                              ) : (
                                 <Tooltip
                                    title="Nieaktywny"
                                    arrow
                                    placement="left"
                                 >
                                    <ArrowDownwardIcon
                                       className={classes.instanceDown}
                                    />
                                 </Tooltip>
                              )}
                              <Tooltip
                                 title={format(
                                    new Date(lastUpdatedTimestamp),
                                    'd MMMM yyyy HH:mm:ss.SSS',
                                    { locale: pl },
                                 )}
                                 arrow
                                 placement="right"
                              >
                                 <Typography className={classes.timeAgo}>
                                    {lastUpdatedTimestampParsed}
                                 </Typography>
                              </Tooltip>
                           </div>
                           <a
                              href={healthCheckUrl}
                              target="_blank"
                              rel="noreferrer"
                           >
                              <Typography>{instanceId}</Typography>
                           </a>
                        </div>
                     );
                  });

                  return (
                     <Grid item key={name} xs={6}>
                        <Paper elevation={5} className={classes.paper}>
                           <div
                              style={{
                                 verticalAlign: 'middle',
                                 width: '100%',
                                 display: 'inline-flex',
                                 justifyContent: 'space-between',
                              }}
                           >
                              <Typography>
                                 {name} {`(${instances.length})`}
                              </Typography>
                           </div>
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
