import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './AdminPage.styles';

const AccountPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Strona administratora
         </Typography>
      </PageWrapper>
   );
};

export default AccountPage;
