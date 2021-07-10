import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { Footer } from 'src/main/layout/footer/Footer';
import { ConfirmationIcon } from 'src/main/components/icons';
import { useStyles } from './ConfirmRegistrationPage.styles';
import ConfirmationButton from './confirmationButton/ConfirmationButton';

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

   const renderMessage = () =>
      message && <div className={classes.message}>{message}</div>;

   const renderContent = () => {
      if (onRequest)
         return <CircularProgress size={100} data-testid="circular-progress" />;
      return (
         <>
            {renderMessage()}
            <ConfirmationButton
               status={status}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </>
      );
   };

   return (
      <>
         {!hasToken && <Redirect to="/" />}
         <Container maxWidth="sm" component="main" className={classes.root}>
            <div className={classes.paper}>
               <ConfirmationIcon onRequest={onRequest} status={status} />
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
