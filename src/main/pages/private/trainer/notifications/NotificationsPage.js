import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './NotificationsPage.styles';

const NotificationsPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Powiadomienia
         </Typography>
      </PageWrapper>
   );
};

export default NotificationsPage;
