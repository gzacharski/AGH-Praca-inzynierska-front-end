import React from 'react';
import { NavLink } from 'src/main/components/buttons';
import { useStyles } from './LoginButton.styles';

export default function LoginButton() {
   const classes = useStyles();
   return (
      <NavLink
         name="Zaloguj się"
         link="/login"
         classes={classes.root}
         testId="login-btn"
      />
   );
}
