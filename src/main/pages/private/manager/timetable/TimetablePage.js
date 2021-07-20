import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './TimetablePage.styles';

export default function News() {
   const classes = useStyles();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Aktualny grafik zajęć (manager)
         </Typography>
      </PageWrapper>
   );
}
