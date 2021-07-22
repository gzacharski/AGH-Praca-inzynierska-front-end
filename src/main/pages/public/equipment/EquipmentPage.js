import React, { useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { STATUS } from 'src/main/store';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { EquipmentCard, EquipmentCardSkeleton } from 'src/main/components/card';
import { ConfirmationIcon } from 'src/main/components/icons';
import {
   fetchEquipmentList,
   selectError,
   selectMessage,
   selectEquipment,
   selectStatus,
} from 'src/main/store/sliceFiles/equipmentSlice';
import { useStyles } from './EquipmentPage.styles';

const ShowEquipmentList = ({ equipment = [] }) => (
   <Grid container spacing={4} justifyContent="center" alignItems="baseline">
      {equipment.map((item) => {
         const { equipmentId, title, images, description } = item;
         return (
            <EquipmentCard
               key={equipmentId}
               title={title}
               images={images}
               description={description}
            />
         );
      })}
   </Grid>
);

const TrainerListCardSkeleton = () => (
   <Grid container spacing={5} justifyContent="center" alignItems="center">
      {[{ id: 1 }, { id: 2 }, { id: 3 }].map((card) => (
         <EquipmentCardSkeleton key={card.id} />
      ))}
   </Grid>
);

const EquipmentPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const equipment = useSelector(selectEquipment);
   const message = useSelector(selectMessage);
   const error = useSelector(selectError);
   const location = useLocation();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { search = '' } = location;
         dispatch(fetchEquipmentList({ search }));
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
            header="Sprzęt treningowy"
            subheader="Odpowiedni dobór sprzętu fitness poprawia efektywność Twoich treningów"
         />
         <Container maxWidth="xl">
            {status === STATUS.SUCCEEDED && (
               <ShowEquipmentList equipment={equipment} />
            )}
            {status === STATUS.LOADING && <TrainerListCardSkeleton />}
         </Container>
      </PageWrapper>
   );
};

export default EquipmentPage;
