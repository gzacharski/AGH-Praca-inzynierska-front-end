import React from 'react';
import { Typography } from '@material-ui/core';
import { ShowTrainings } from 'src/main/components/gallery';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './WorkoutsPage.styles';

export default function Offer() {
   const classes = useStyles();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Oferta zajęć grupowych
         </Typography>
         <ShowTrainings />
      </PageWrapper>
   );
}
