/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography, makeStyles, Slider } from '@material-ui/core';

import { formatISO9075, formatDistanceToNow, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { selectUserInfo } from 'src/main/store/sliceFiles/accountSlice';
import {
   selectStatus,
   fetchUserNextTraining,
   selectNextTraining,
} from 'src/main/store/sliceFiles/nextTrainingSlice';
import { PageWrapper } from 'src/main/components/utils';
import { AvatarIcon } from 'src/main/components/icons';
import { STATUS } from 'src/main/store/status';
import { useAuth } from 'src/main/auth';
import {
   fetchUserGympass,
   selectGympassStatus,
   selectById,
} from 'src/main/store/sliceFiles/adminSlices/usersSlice';

const useStyles = makeStyles(({ spacing }) => ({
   paper: {
      minHeight: '150px',
      padding: spacing(2),
   },
   paper2: {
      padding: spacing(2),
      maxWidth: '350px',
   },
   stats: {
      minHeight: '350px',
   },
   user: {
      display: 'flex',
   },
   avatar: {
      marginLeft: spacing(1),
      marginRight: spacing(1),
   },
   info: {
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
   },
}));

const NextWorkout = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const nextTraining = useSelector(selectNextTraining);

   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchUserNextTraining({ userId, token }));
      }
   }, [status, dispatch]);

   const { title = '', startDate = '', location = '' } = nextTraining || {};

   let closestWorkout;
   try {
      closestWorkout = formatDistanceToNow(Date.parse(startDate), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      closestWorkout = '';
   }

   return (
      <Paper elevation={3} className={classes.paper}>
         <Typography variant="h6">Najbliższe wydarzenie</Typography>
         {status === STATUS.SUCCEEDED ? (
            <Paper className={classes.paper2}>
               <Typography variant="h6">{title}</Typography>
               <Typography variant="body1">
                  {Boolean(location) && `${location},`} {closestWorkout}
               </Typography>
            </Paper>
         ) : (
            <Paper className={classes.paper2}>
               <Typography variant="h6">
                  Nie masz zaplanowanego żadnego treningu
               </Typography>
            </Paper>
         )}
      </Paper>
   );
};

const LatestUserGympass = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const [currentGympass, setCurrentGympass] = useState('');
   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;
   const userGympass = useSelector((state) => selectById(state, userId));

   const startDate = Date.parse(currentGympass?.startDate || '1970-01-01');
   const endDate = Date.parse(currentGympass?.endDate || '2170-01-01');
   const currentDate = Date.now();

   const value = ((currentDate - startDate) * 100) / (endDate - startDate);

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchUserGympass({ userId, token }));
      }
   }, [status, dispatch]);

   useEffect(() => {
      const { gympass = {} } = userGympass || {};
      setCurrentGympass(gympass);
   }, [userGympass]);

   const {
      gymPassOffer = {},
      purchaseDateTime = '1970-01-01T10:00:00',
      entries = 0,
   } = currentGympass || {};

   const { temporaryPass = false } = gymPassOffer;

   const renderProperGympass = (
      <>
         <Typography variant="h6">
            Twój typ karnetu: {gymPassOffer?.title || ''}
         </Typography>
         <Slider value={value} track="inverted" disabled />
         <Typography>
            Zakupiono: {formatISO9075(parseISO(purchaseDateTime))}
         </Typography>
         {temporaryPass ? (
            <Typography>
               Ważny w dniach: od{' '}
               {formatISO9075(startDate, { representation: 'date' })} do{' '}
               {formatISO9075(endDate, { representation: 'date' })}
            </Typography>
         ) : (
            <Typography>Ilość pozostałych wejść: {entries}</Typography>
         )}
      </>
   );

   return (
      <Paper elevation={3} className={classes.paper}>
         {status === STATUS.SUCCEEDED ? (
            renderProperGympass
         ) : (
            <Paper className={classes.paper2}>
               <Typography variant="h6">Nie masz aktualnego karnetu</Typography>
            </Paper>
         )}
      </Paper>
   );
};

const AccountPage = () => {
   const classes = useStyles();
   const user = useSelector(selectUserInfo);
   const { name, surname, email, phone } = user;

   return (
      <PageWrapper>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
               <Paper elevation={3} className={classes.paper}>
                  <div className={classes.user}>
                     <div className={classes.avatar}>
                        <AvatarIcon huge />
                     </div>
                     <div className={classes.info}>
                        <Typography variant="h6">
                           {name} {surname}
                        </Typography>
                        <Typography variant="body2">{phone}</Typography>
                        <Typography variant="body2">{email}</Typography>
                     </div>
                  </div>
               </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
               <LatestUserGympass />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
               <NextWorkout />
            </Grid>
         </Grid>
      </PageWrapper>
   );
};

export default AccountPage;
