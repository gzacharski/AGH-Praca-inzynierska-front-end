import React, { useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
   fetchPriceList,
   selectError,
   selectMessage,
   selectPriceList,
   selectStatus,
} from 'src/main/store/sliceFiles/priceListSlice';
import { PriceListCard, PriceListCardSkeleton } from 'src/main/components/card';
import { STATUS } from 'src/main/store';
import { ConfirmationIcon } from 'src/main/components/icons';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { useStyles } from './PriceListPage.styles';

const ShowPriceList = ({ gymPasses }) => (
   <Grid container spacing={5} justifyContent="center" alignItems="center">
      {gymPasses.map((gymPass) => (
         <Grid item key={gymPass.id} xs={12} sm={6} md={4} lg={3}>
            <PriceListCard gymPass={gymPass} />
         </Grid>
      ))}
   </Grid>
);

const ShowPriceListSkeleton = () => (
   <Grid container spacing={5} justifyContent="center" alignItems="center">
      {[
         { id: 1, isSmall: true },
         { id: 2, isSmall: false },
         { id: 3, isSmall: true },
      ].map((card) => (
         <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <PriceListCardSkeleton isSmall={card.isSmall} />
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
         <PublicPageTitle
            header="Oferta karnetów"
            subheader="Wybierz odpowiedni dla siebie typ karnetu i zacznij ćwiczyć!"
         />
         <Container maxWidth="xl">
            {status === STATUS.SUCCEEDED && (
               <ShowPriceList gymPasses={priceList} />
            )}
            {status === STATUS.LOADING && <ShowPriceListSkeleton />}
         </Container>
      </PageWrapper>
   );
};

export default PriceListPage;
