/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { trainingsServiceURL } from 'src/main/data/urls';
import { TrainingCard } from 'src/main/components/card';

const trainingsTestContent = [
   {
      id: '1',
      name: 'Turpis nulla',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer1',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '2',
      name: 'Praesent pharetra',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer2',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '3',
      name: 'Suspendisse',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '4',
      name: 'Tpretiu',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '5',
      name: 'Venenatis',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '6',
      name: 'Lobortis et dolor',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '7',
      name: 'Eget elementum',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
   {
      id: '8',
      name: 'Sed nec feugiat',
      image: 'https://source.unsplash.com/random',
      description:
         `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
         porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
         nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
         quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
         euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
         sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer3',
         name:'Jan',
         surname: 'Kowalski',
         avatar: '/static/images/avatar/1.jpg'
      }
   },
];

const ShowTrainings = () => {
   const [trainings, setTrainings] = useState(null);
   const [success, setSuccess] = useState(true);

   useEffect(() => {
      axios
         .get(`${trainingsServiceURL}/group`, {
            validateStatus: (status) =>
               (status >= 200 && status < 300) || status === 409,
         })
         .then((response) => {
            console.log(response);
            // setTrainings(response.data);
            setSuccess(true);
            setTrainings(trainingsTestContent);
         })
         .catch((error) => {
            setTrainings(trainingsTestContent);
            setSuccess(true);
         });
   }, [trainings, success]);

   return (
      <>
         {trainings && (
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
         )}
      </>
   );
};

export default ShowTrainings;
