import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      marginTop: spacing(20),
   },
}));

export const NoNotifications = () => {
   const classes = useStyles();
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
               <NotificationsNoneSharpIcon
                  color="disabled"
                  style={{ fontSize: 80 }}
               />
            </Grid>
            <Grid item>
               <Typography variant="h5" align="center" color="textSecondary">
                  Brak powiadomień
               </Typography>
            </Grid>
         </Grid>
      </div>
   );
};
