import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './EquipmentPage.styles';

export default function Blog() {
   const classes = useStyles();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Sprzęt treningowy
         </Typography>
      </PageWrapper>
   );
}
