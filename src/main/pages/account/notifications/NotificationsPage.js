import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './NotificationsPage.styles';

const MessagesPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Powiadomienia (użytkownik)
         </Typography>
      </PageWrapper>
   );
};

export default MessagesPage;
