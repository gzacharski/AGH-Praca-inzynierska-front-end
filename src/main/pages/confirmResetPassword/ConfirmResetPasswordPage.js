import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { ConfirmationIcon } from 'src/main/components/icons';
import { Footer } from 'src/main/layout';
import { useStyles } from './ConfirmResetPasswordPage.styles';
import ConfirmationResetPasswordContent from './confirmationContent/ConfirmationResetPasswordContent';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

export default function ConfirmResetPasswordPage() {
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
            <ConfirmationResetPasswordContent
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
                  Zresetuj hasło
               </Typography>
               {renderContent()}
               <Footer />
            </div>
         </Container>
      </>
   );
}
