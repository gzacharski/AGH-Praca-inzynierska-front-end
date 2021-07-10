import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
   Typography,
   Container,
   Grid,
   CircularProgress,
} from '@material-ui/core';
import { PriceListCard } from 'src/main/components/card';
import { gymPassServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { ConfirmationIcon } from 'src/main/components/icons';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './PriceListPage.styles';

const ShowPriceList = ({ gymPasses }) => (
   <Grid container spacing={5} justify="center" alignItems="center">
      {gymPasses.map((gymPass) => (
         <Grid item key={gymPass.id} xs={12} sm={6} md={4} lg={3}>
            <PriceListCard gymPass={gymPass} />
         </Grid>
      ))}
   </Grid>
);

const PriceListPage = () => {
   const classes = useStyles();
   const [gymPasses, setGymPasses] = useState([]);
   const [onRequest, setOnRequest] = useState(false);
   const [message, setMessage] = useState(null);
   const [status, setStatus] = useState(null);

   useEffect(() => {
      setOnRequest(true);
      axios
         .get(`${gymPassServiceURL}/offer`, {
            headers: {
               'Accept-Language': 'pl',
            },
         })
         .then((response) => {
            setStatus(response.status);
            setGymPasses(response.data);
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
   }, []);

   if (onRequest) {
      return (
         <Container maxWidth="sm" className={classes.container}>
            <CircularProgress size={100} data-testid="circular-progress" />
         </Container>
      );
   }

   if (message !== null) {
      return (
         <Container className={classes.container}>
            <ConfirmationIcon onRequest={onRequest} status={status} />
            <Typography className={classes.message}>{message}</Typography>
         </Container>
      );
   }

   return (
      <PageWrapper>
         <Container maxWidth="sm" className={classes.pageTitle}>
            <Typography
               variant="h3"
               align="center"
               color="textPrimary"
               gutterBottom
            >
               Oferta karnetów
            </Typography>
            <Typography
               variant="h4"
               align="center"
               color="textSecondary"
               gutterBottom
            >
               Wybierz odpowiedni dla siebie typ karnetu i zacznij ćwiczyć!
            </Typography>
         </Container>
         <Container maxWidth="xl" className={{ alignItems: 'center' }}>
            <ShowPriceList gymPasses={gymPasses} />
         </Container>
      </PageWrapper>
   );
};

export default PriceListPage;
