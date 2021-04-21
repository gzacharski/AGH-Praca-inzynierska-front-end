import {
   Avatar,
   Backdrop,
   CircularProgress,
   Container,
   Snackbar,
   Slide,
   Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { SingUpForm } from 'src/main/components/forms';
import { Footer } from 'src/main/layout';
import { useStyles } from './SignUp.styles';

export default function SingUp() {
   const classes = useStyles();
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [responseMessage, setResponseMessage] = useState('');
   const [displaySnackBar, setDisplaySnackBar] = useState(false);
   const [displayBackDrop, setDisplayBackdrop] = useState(false);

   const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') return;
      setDisplaySnackBar(false);
   };

   return (
      <Slide direction="right" in mountOnEnter unmountOnExit timeout={400}>
         <Container maxWidth="sm" component="main" data-testid="main-container">
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
               >
                  Zarejestruj się
               </Typography>
               <SingUpForm
                  setSuccess={setSuccess}
                  setDisplayBackdrop={setDisplayBackdrop}
                  setDisplaySnackBar={setDisplaySnackBar}
                  setResponseMessage={setResponseMessage}
                  setError={setError}
               />
               <Footer />
               <Backdrop className={classes.backdrop} open={displayBackDrop}>
                  <CircularProgress
                     color="inherit"
                     data-testid="sign-up-backdrop"
                  />
               </Backdrop>
               <Snackbar
                  open={displaySnackBar}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackBar}
               >
                  <MuiAlert
                     elevation={6}
                     variant="filled"
                     onClose={handleCloseSnackBar}
                     severity={
                        // eslint-disable-next-line no-nested-ternary
                        error ? 'error' : success ? 'success' : 'warning'
                     }
                     data-testid="sign-up-snackbar"
                  >
                     {responseMessage}
                  </MuiAlert>
               </Snackbar>
            </div>
         </Container>
      </Slide>
   );
}
