import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './TrainerPage.styles';

const TrainerPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Strona trenera
         </Typography>
      </PageWrapper>
   );
};

export default TrainerPage;
