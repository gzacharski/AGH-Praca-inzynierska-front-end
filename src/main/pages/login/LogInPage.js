/* eslint-disable jsx-a11y/anchor-is-valid */
import {
   Grid,
   Link,
   Paper,
   Snackbar,
   Slide,
   Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { LogInForm } from 'src/main/components/forms';
import { Footer } from 'src/main/layout';
import { useStyles } from './LogInPage.styles';
import { LogInIcon } from './LogInIcon';

export default function Login() {
   const classes = useStyles();

   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [responseMessage, setResponseMessage] = useState('');
   const [displaySnackBar, setDisplaySnackBar] = useState(false);
   const [displayCircularProgress, setDisplayCircularProgress] = useState(
      false,
   );
   const [redirection, setRedirection] = useState(false);

   const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') return;
      setDisplaySnackBar(false);
   };

   return (
      <>
         {redirection && <Redirect to="/client" />}
         <Slide direction="right" in mountOnEnter unmountOnExit timeout={400}>
            <Grid container className={classes.root}>
               <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  lg={9}
                  xl={10}
                  className={classes.image}
               />
               <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  lg={3}
                  xl={2}
                  elevation={6}
                  component={Paper}
                  square
               >
                  <div className={classes.paper}>
                     <LogInIcon
                        success={success}
                        progress={displayCircularProgress}
                     />
                     <Typography
                        variant="h5"
                        className={classes.heading}
                        align="center"
                     >
                        Zaloguj się
                     </Typography>
                     <LogInForm
                        setSuccess={setSuccess}
                        setDisplayCircularProgress={setDisplayCircularProgress}
                        setDisplaySnackBar={setDisplaySnackBar}
                        setResponseMessage={setResponseMessage}
                        setError={setError}
                        setRedirection={setRedirection}
                     />
                     <Grid container alignItems="stretch">
                        <Grid item xs>
                           <Link href="#" variant="body2">
                              Nie pamiętasz hasła?
                           </Link>
                        </Grid>
                        <Grid item>
                           <Link
                              component={RouterLink}
                              to="/sign-up"
                              variant="body2"
                           >
                              Utwórz konto
                           </Link>
                        </Grid>
                     </Grid>
                     <Footer />
                     <Snackbar
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'right',
                        }}
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
               </Grid>
            </Grid>
         </Slide>
      </>
   );
}
