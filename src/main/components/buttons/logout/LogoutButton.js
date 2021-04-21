import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './LogoutButton.styles';

export default function LoginButton() {
   const classes = useStyles();
   const authContext = useContext(AuthContext);

   return (
      <Button
         color="inherit"
         data-testid="logout-btn"
         role="button"
         onClick={() => authContext.logout()}
         className={classes.root}
      >
         Wyloguj się
      </Button>
   );
}
