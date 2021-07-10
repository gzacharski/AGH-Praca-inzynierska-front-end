import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './StatisticsPage.styles';

const SettingsPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Statystyki
         </Typography>
      </PageWrapper>
   );
};

export default SettingsPage;
