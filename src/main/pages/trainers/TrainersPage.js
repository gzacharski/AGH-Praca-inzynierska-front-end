import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './TrainersPage.styles';

export default function TrainersPage() {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main">
         <Typography variant="h5" className={classes.root} align="center">
            Trenerzy
         </Typography>
      </Container>
   );
}
