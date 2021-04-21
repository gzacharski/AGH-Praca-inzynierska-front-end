import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './Client.styles';

const Client = () => {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Strona prywatna klienta
         </Typography>
      </Container>
   );
};

export default function AuthClient() {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   return (
      <>
         {token === null && <Redirect to="/login" />}
         <Client />
      </>
   );
}
