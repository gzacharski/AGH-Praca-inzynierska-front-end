import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './EquipmentPage.styles';

const EquipmentPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Modyfikuj sprzęt (admin)
         </Typography>
      </PageWrapper>
   );
};

export default EquipmentPage;
