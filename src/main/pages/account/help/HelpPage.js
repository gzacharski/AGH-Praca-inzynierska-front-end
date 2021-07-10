import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './HelpPage.styles';

export default function Contact() {
   const classes = useStyles();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Pomoc
         </Typography>
      </PageWrapper>
   );
}
