import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './Home.styles';

export default function Home() {
   const classes = useStyles();

   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Strona główna
            <br />
         </Typography>
      </PageWrapper>
   );
}
