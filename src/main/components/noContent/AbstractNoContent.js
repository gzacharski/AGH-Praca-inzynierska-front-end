import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      marginTop: spacing(20),
   },
}));

export const AbstractNoContent = ({ icon, title }) => {
   const classes = useStyles();
   const Icon = icon;
   return (
      <div className={classes.root}>
         <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            spacing={1}
         >
            <Grid item>
               <Icon color="disabled" style={{ fontSize: 80 }} />
            </Grid>
            <Grid item>
               <Typography variant="h5" align="center" color="textSecondary">
                  {title}
               </Typography>
            </Grid>
         </Grid>
      </div>
   );
};
