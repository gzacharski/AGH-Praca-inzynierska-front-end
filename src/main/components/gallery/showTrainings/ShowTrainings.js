/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
   Container,
   Grid,
   CircularProgress,
   Typography,
} from '@material-ui/core';
import { trainingsServiceURL } from 'src/main/data/urls';
import { TrainingCard } from 'src/main/components/card';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { ConfirmationIcon } from 'src/main/components/icons';
import { useStyles } from './ShowTrainings.styles';

const ShowTrainings = () => {
   const classes = useStyles();

   const [trainings, setTrainings] = useState([]);
   const [onRequest, setOnRequest] = useState(false);
   const [message, setMessage] = useState('');
   const [status, setStatus] = useState(null);

   useEffect(() => {
      setOnRequest(true);
      axios
         .get(`${trainingsServiceURL}/group`, {
            headers: {
               'Accept-Language': 'pl',
            },
         })
         .then((response) => {
            if (response.data.trainings.length === 0) {
               setStatus(401);
               setMessage(response.data.message);
            } else {
               setStatus(response.status);
               setTrainings(response.data.trainings);
            }
         })
         .catch((error) => {
            if (error.response === undefined) {
               setStatus(500);
               setMessage(NETWORK_ERROR);
            } else {
               setStatus(error.response?.status);
               setMessage(error.response?.data?.message);
            }
         })
         .finally(() => {
            setOnRequest(false);
         });
   }, [trainings]);

   if (onRequest)
      return (
         <Container maxWidth="sm" className={classes.container}>
            <CircularProgress size={100} data-testid="circular-progress" />
         </Container>
      );
   if (trainings === null || trainings.length === 0)
      return (
         <Container className={classes.container}>
            <ConfirmationIcon onRequest={onRequest} status={status} />
            <Typography className={classes.message}>{message}</Typography>
         </Container>
      );

   return (
      <Container>
         <Grid container spacing={5}>
            {trainings.map((training) => (
               <Grid item key={training.id} xs={12} sm={6} md={4}>
                  <TrainingCard
                     imageSource={training.image}
                     imageTitle={training.name}
                     description={training.description}
                     title={training.name}
                     trainer={`${training.trainer.name} ${training.trainer.surname}`}
                     trainerAvatar={training.trainer.avatar}
                  />
               </Grid>
            ))}
         </Grid>
      </Container>
   );
};

export default ShowTrainings;
