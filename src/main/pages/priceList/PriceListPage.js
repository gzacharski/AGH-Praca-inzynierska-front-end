import React, { useEffect } from 'react';
import {
   Typography,
   Container,
   Grid,
   CircularProgress,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
   fetchPriceList,
   selectError,
   selectMessage,
   selectPriceList,
   selectStatus,
} from 'src/main/store/sliceFiles/priceListSlice';
import { PriceListCard } from 'src/main/components/card';
import { STATUS } from 'src/main/store';
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
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const priceList = useSelector(selectPriceList);
   const message = useSelector(selectMessage);
   const error = useSelector(selectError);
   const location = useLocation();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { search = '' } = location;
         dispatch(fetchPriceList({ search }));
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
         {status === STATUS.SUCCEEDED && (
            <Container maxWidth="xl" className={{ alignItems: 'center' }}>
               <ShowPriceList gymPasses={priceList} />
            </Container>
         )}
         {status === STATUS.LOADING && (
            <Container maxWidth="sm" className={classes.container}>
               <CircularProgress size={100} data-testid="circular-progress" />
            </Container>
         )}
      </PageWrapper>
   );
};

export default PriceListPage;
