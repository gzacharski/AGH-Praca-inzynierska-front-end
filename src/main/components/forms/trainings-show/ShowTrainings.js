/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { useStyles } from './ShowTrainingsForm.styles';

const ShowTrainings = () => {
   const [trainings, setTrainings] = useState(null);

   const statusRequest = () => {
      console.log('request: ');
      axios
         .get(`${trainingsServiceURL}/status`, {
            validateStatus: (status) =>
               (status >= 200 && status < 300) || status === 409,
         })
         .then((response) => {
            console.log('response: ', response.data);
         });
   };

   const showGroupTrainings = () => {
      console.log('request: ');
      axios
         .get(`${trainingsServiceURL}/group`, {
            validateStatus: (status) =>
               (status >= 200 && status < 300) || status === 409,
         })
         .then((response) => {
            console.log('response: ', response.data);
         })
         .catch((error) => {
            console.log(error);
            setTrainings(['TRX', 'Pilates', 'Boks']);
         });
   };

   const showTrainings = () =>
      trainings.map((training) => <h2 key={training}>{training}</h2>);

   const classes = useStyles();
   return (
      <div>
         <h1>Hello, there will be offers</h1>
         {/* <h2>{showGroupTrainings()}</h2> */}
         <div>{trainings && showTrainings()}</div>
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => showGroupTrainings()}
         >
            Offers
         </Button>
      </div>
   );
};

export default ShowTrainings;
