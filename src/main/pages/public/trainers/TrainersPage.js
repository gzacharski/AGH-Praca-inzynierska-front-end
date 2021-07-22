import React, { useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { STATUS } from 'src/main/store';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { TrainerCard, TrainerCardSkeleton } from 'src/main/components/card';
import { ConfirmationIcon } from 'src/main/components/icons';
import {
   fetchTrainerList,
   selectError,
   selectMessage,
   selectTrainers,
   selectStatus,
} from 'src/main/store/sliceFiles/trainerListSlice';
import { useStyles } from './TrainerPage.styles';

const ShowTrainerList = ({ trainers = [] }) => (
   <Grid container spacing={4} justifyContent="center" alignItems="baseline">
      {trainers.map((trainer) => {
         const { userId, name, surname, images, avatar, description } = trainer;
         return (
            <TrainerCard
               key={userId}
               name={name}
               surname={surname}
               images={images}
               avatar={avatar}
               description={description}
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

const TrainersPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const trainers = useSelector(selectTrainers);
   const message = useSelector(selectMessage);
   const error = useSelector(selectError);
   const location = useLocation();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { search = '' } = location;
         dispatch(fetchTrainerList({ search }));
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
            header="Nasi trenerzy"
            subheader="Dowiedz się więcej o prowadzących zajęcia fitness"
         />
         <Container maxWidth="xl">
            {status === STATUS.SUCCEEDED && (
               <ShowTrainerList trainers={trainers} />
            )}
            {status === STATUS.LOADING && <TrainerListCardSkeleton />}
         </Container>
      </PageWrapper>
   );
};

export default TrainersPage;
