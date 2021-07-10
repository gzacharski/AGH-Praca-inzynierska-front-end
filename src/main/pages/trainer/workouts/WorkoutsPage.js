import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './WorkoutsPage.styles';

const WorkoutsPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Zajęcia trenera
         </Typography>
      </PageWrapper>
   );
};

export default WorkoutsPage;
