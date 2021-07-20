import React from 'react';
import { Box, Card, CardContent, Grid, CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './EquipmentCardSkeleton.styles';

const EquipmentCardSkeleton = () => {
   const classes = useStyles();
   return (
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
         <Card className={classes.card}>
            <CardMedia>
               <Skeleton variant="rect" width="100%" height="350px" />
            </CardMedia>
            <CardContent className={classes.cardContent}>
               <Box className={classes.box}>
                  <Skeleton width="40%" height="50px" />
                  <div className={classes.icons}>
                     <Skeleton width="40px" height="20px" />
                  </div>
               </Box>
               <Skeleton width="100%" height="30px" />
            </CardContent>
         </Card>
      </Grid>
   );
};

export { EquipmentCardSkeleton };
