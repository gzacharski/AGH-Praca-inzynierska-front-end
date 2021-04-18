import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AuthWrapper, AuthPrompt } from 'src/main/auth';
import { useStyles } from './Client.styles';

const Client = () => {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Strona prywatna klient
         </Typography>
      </Container>
   );
};

export default AuthWrapper((props) => (
   <Switch>
      {!props.isAuthenticated && <Route component={AuthPrompt} />}
      <Client />
   </Switch>
));
