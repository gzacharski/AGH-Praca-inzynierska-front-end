import React from 'react';
import NavLinkButton from '../navLink/NavLinkButton';
import { useStyles } from './SignUpButton.styles';

export default function SignUpButton() {
   const classes = useStyles();
   return (
      <NavLinkButton
         name="Zarejestruj się"
         link="/sign-up"
         classes={classes.root}
         testId="header-singUp-button"
      />
   );
}
