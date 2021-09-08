import React, { useState } from 'react';
import {
   Container,
   CircularProgress,
   Typography,
   Slide,
   Paper,
} from '@material-ui/core';
import { ConfirmationIcon } from 'src/main/components/icons';
import { useStyles } from './ResetPasswordPage.styles';
import ResetPasswordContent from './resetPasswordContent/ResetPasswordContent';

export default function ResetPasswordPage() {
   const classes = useStyles();
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
            <ResetPasswordContent
               status={status}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </>
      );
   };

   return (
      <Slide direction="right" in mountOnEnter unmountOnExit timeout={400}>
         <Container maxWidth="sm" component="main" className={classes.root}>
            <Paper className={classes.paper}>
               <ConfirmationIcon onRequest={onRequest} status={status} />
               <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
               >
                  Zresetuj hasło
               </Typography>
               {renderContent()}
            </Paper>
         </Container>
      </Slide>
   );
}
