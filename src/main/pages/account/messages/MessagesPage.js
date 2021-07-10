import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './MessagesPage.styles';

const MessagesPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Wiadomości
         </Typography>
      </PageWrapper>
   );
};

export default MessagesPage;
