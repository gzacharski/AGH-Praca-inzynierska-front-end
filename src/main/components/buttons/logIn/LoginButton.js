import React from 'react';
import NavLinkButton from '../navLinkButton/NavLinkButton';
import { useStyles } from './LoginButton.styles';

export default function LoginButton() {
   const classes = useStyles();
   return (
      <NavLinkButton
         name="Zaloguj się"
         link="/login"
         classes={classes.root}
         testId="login-btn"
      />
   );
}
