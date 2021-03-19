/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { SingUpForm } from 'src/main/components/forms';
import { Footer } from 'src/main/layout';
import { useStyles } from './SignUp.styles';

export default function SingUp() {
   const classes = useStyles();
   return (
      <Container maxWidth="sm" component="main" data-testid="main-container">
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" className={classes.heading} align="center">
               Zarejestruj się
            </Typography>
            <SingUpForm />
            <Footer />
         </div>
      </Container>
   );
}
