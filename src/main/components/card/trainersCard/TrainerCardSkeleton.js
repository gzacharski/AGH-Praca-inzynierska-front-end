import React from 'react';
import {
   Box,
   Card,
   CardContent,
   Grid,
   Chip,
   CardMedia,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { nanoid } from 'nanoid';
import { useStyles } from './TrainerCardSkeleton.styles';

const TrainerCardSkeleton = () => {
   const classes = useStyles();

   const trainings = [
      { trainingId: nanoid(), title: 'Trening personalny' },
      { trainingId: nanoid(), title: 'TRX' },
      { trainingId: nanoid(), title: 'Wiosła' },
   ];

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
                     <Skeleton
                        variant="circle"
                        className={classes.iconSkeleton}
                     />
                  </div>
               </Box>
               <Skeleton width="90%" height="30px" />
               <Grid container spacing={1} className={classes.grid}>
                  {trainings.map((training) => (
                     <Grid item key={training?.trainingId}>
                        <Skeleton
                           variant="circle"
                           className={classes.skeletonChip}
                        >
                           <Chip label={training?.title} />
                        </Skeleton>
                     </Grid>
                  ))}
               </Grid>
            </CardContent>
         </Card>
      </Grid>
   );
};

export { TrainerCardSkeleton };
