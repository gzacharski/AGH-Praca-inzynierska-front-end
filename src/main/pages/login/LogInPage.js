/* eslint-disable jsx-a11y/anchor-is-valid */
import {
   Avatar,
   Button,
   Checkbox,
   FormControlLabel,
   Grid,
   Link,
   Paper,
   Slide,
   TextField,
   Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Footer } from '../../layout';
import { useStyles } from './LogInPage.styles';

export default function Login() {
   const classes = useStyles();
   return (
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
                  <Avatar className={classes.avatar}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                     variant="h5"
                     className={classes.heading}
                     align="center"
                  >
                     Zaloguj się
                  </Typography>
                  <form className={classes.form} noValidate>
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Zapamiętaj mnie"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                     >
                        Zaloguj
                     </Button>
                  </form>
                  <Grid container>
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
               </div>
            </Grid>
         </Grid>
      </Slide>
   );
}
