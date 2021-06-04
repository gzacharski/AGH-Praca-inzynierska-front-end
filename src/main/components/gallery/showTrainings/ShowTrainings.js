/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { trainingsServiceURL } from 'src/main/data/urls';
import { TrainingCard } from 'src/main/components/card';

const ShowTrainings = () => {
   const [trainings, setTrainings] = useState(null);
   const [success, setSuccess] = useState(true);

   const showGroupTrainings = () => {
      axios
         .get(`${trainingsServiceURL}/group`, {
            validateStatus: (status) =>
               (status >= 200 && status < 300) || status === 409,
         })
         .then((response) => {
            setTrainings(response.data);
         })
         .catch((error) => {
            setSuccess(false);
         });
   };

   // const trainings = [
   //    {
   //       id: '123',
   //       trainingName: 'TRX',
   //       trainerId: '121',
   //       date: '2020-12-12',
   //    },
   //    {
   //       id: 'udas',
   //       trainingName: 'TRX1',
   //       trainerId: '121',
   //       date: '2020-12-12',
   //    },
   //    {
   //       id: '1233',
   //       trainingName: 'TRX',
   //       trainerId: '121',
   //       date: '2020-12-12',
   //    },
   //    {
   //       id: 'udas1',
   //       trainingName: 'TRX1',
   //       trainerId: '121',
   //       date: '2020-12-12',
   //    },
   // ];

   return (
      <>
         {trainings && (
            <Container maxWidth="md">
               <Grid container spacing={4}>
                  {trainings.map((training) => (
                     <Grid item key={training.id} xs={12} sm={6} md={4}>
                        <TrainingCard
                           imageSource="https://source.unsplash.com/random"
                           imageTitle={training.trainingName}
                           trainingDescription={training.trainingName}
                           trainingTitle={training.trainingName}
                        />
                     </Grid>
                  ))}
               </Grid>
            </Container>
         )}
      </>
   );
};

export default ShowTrainings;
