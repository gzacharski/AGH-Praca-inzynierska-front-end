import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { STATUS } from 'src/main/store';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { TrainerCardSkeleton, TrainingCard } from 'src/main/components/card';
import { ConfirmationIcon } from 'src/main/components/icons';
import {
   fetchWorkoutList,
   selectError,
   selectMessage,
   selectWorkouts,
   selectStatus,
} from 'src/main/store/sliceFiles/workoutSlice';
import { useStyles } from './WorkoutsPage.styles';

const WorkoutCards = ({ workouts = [] }) => (
   <Grid container spacing={4} justifyContent="center" alignItems="baseline">
      {workouts.map((workout) => {
         const {
            trainingTypeId = '',
            name = '',
            image = '',
            description = '',
            trainer = '',
         } = workout || {};
         return (
            <TrainingCard
               key={trainingTypeId}
               image={image}
               description={description}
               title={name}
               trainer={trainer}
            />
         );
      })}
   </Grid>
);

const TrainerListCardSkeleton = () => (
   <Grid container spacing={5} justifyContent="center" alignItems="center">
      {[{ id: 1 }, { id: 2 }, { id: 3 }].map((card) => (
         <TrainerCardSkeleton key={card.id} />
      ))}
   </Grid>
);

const WorkoutsPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const workouts = useSelector(selectWorkouts);
   const message = useSelector(selectMessage);
   const error = useSelector(selectError);
   const location = useLocation();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { search = '' } = location;
         dispatch(fetchWorkoutList({ search }));
      }
   }, [status, dispatch]);

   if (status === STATUS.FAILED) {
      return (
         <Container className={classes.container}>
            <ConfirmationIcon onRequest={false} status={error?.status} />
            <Typography className={classes.message}>{message}</Typography>
         </Container>
      );
   }

   return (
      <PageWrapper>
         <PublicPageTitle
            header="Oferta zajęć grupowych"
            subheader="Dobierz odpowiedni trening dla siebie"
         />
         <Container maxWidth="xl">
            {status === STATUS.SUCCEEDED && (
               <WorkoutCards workouts={workouts} />
            )}
            {status === STATUS.LOADING && <TrainerListCardSkeleton />}
         </Container>
      </PageWrapper>
   );
};

export default WorkoutsPage;
