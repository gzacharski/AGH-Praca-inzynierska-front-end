import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {
   Avatar,
   Container,
   CircularProgress,
   Typography,
} from '@material-ui/core';
import {
   LockOutlined,
   CheckCircle,
   Error,
   ReportProblem,
} from '@material-ui/icons';
import {
   ActivateAccountButton,
   ActivateAccountRefreshButton,
   LoginButton,
} from 'src/main/components/buttons';
import { Footer } from 'src/main/layout';
import { useStyles } from './ConfirmRegistrationPage.styles';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

export default function ConfirmRegistration() {
   const classes = useStyles();
   const params = useQuery();
   const hasToken = params.has('token');
   const [status, setStatus] = useState(null);
   const [message, setMessage] = useState(null);
   const [onRequest, setOnRequest] = useState(false);

   const renderProperButton = () => {
      if (status === 200) return <LoginButton />;
      if (status === 401 || status === 404)
         return (
            <ActivateAccountRefreshButton
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         );
      if (status === 500) return null;
      return (
         <ActivateAccountButton
            setMessage={setMessage}
            setOnRequest={setOnRequest}
            setStatus={setStatus}
         />
      );
   };

   const renderMessage = () =>
      message && <div className={classes.message}>{message}</div>;

   const renderContent = () => {
      if (onRequest)
         return <CircularProgress size={100} data-testid="circular-progress" />;
      return (
         <>
            {renderMessage()}
            {renderProperButton()}
         </>
      );
   };

   const handleIconChange = () => {
      if (!onRequest) {
         if (status === 200) {
            return (
               <Avatar className={classes.avatar200}>
                  <CheckCircle data-testid="check-circle" />
               </Avatar>
            );
         }
         if (status === 401 || status === 404) {
            return (
               <Avatar className={classes.avatar400}>
                  <ReportProblem data-testid="report-problem" />
               </Avatar>
            );
         }
         if (status === 500) {
            return (
               <Avatar className={classes.avatar500}>
                  <Error data-testid="error" />
               </Avatar>
            );
         }
      }
      return (
         <Avatar className={classes.avatar}>
            <LockOutlined />
         </Avatar>
      );
   };

   return (
      <>
         {!hasToken && <Redirect to="/" />}
         <Container maxWidth="sm" component="main" className={classes.root}>
            <div className={classes.paper}>
               {handleIconChange()}
               <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
               >
                  Potwierdzenie rejestracji
               </Typography>
               {renderContent()}
               <Footer />
            </div>
         </Container>
      </>
   );
}
