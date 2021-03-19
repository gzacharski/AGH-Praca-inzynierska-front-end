import React from 'react';
import NavLinkButton from '../navLinkButton/NavLinkButton';
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
