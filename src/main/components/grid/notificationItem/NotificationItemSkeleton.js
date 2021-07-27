import React from 'react';
import { Grid, Paper, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './NotificationItem.styles';

export const NotificationItemSkeleton = () => {
   const classes = useStyles();

   return (
      <Grid item xs={10} md={8} lg={6}>
         <Paper className={classes.rootSkeleton} elevation={6}>
            <div className={classes.body}>
               <div className={classes.header}>
                  <Skeleton width="35%" />
                  <Skeleton>
                     <IconButton aria-label="delete notification">
                        <DeleteIcon />
                     </IconButton>
                  </Skeleton>
               </div>
               <Skeleton width="50%" className={classes.time} />
               <Skeleton width="100%" className={classes.content} />
               <Skeleton width="80%" className={classes.content} />
            </div>
         </Paper>
      </Grid>
   );
};
