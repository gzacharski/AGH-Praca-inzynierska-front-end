/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { authServiceURL } from 'src/main/data/urls';
import { useStyles } from './ActivateAccountButton.styles';
import AbstractActivateAccountButton from '../AbstractActivateAccountButton';

const ActivateAccountButton = (props) => {
   const classes = useStyles();
   const confirmationURL = `${authServiceURL}/users/confirmRegistration`;
   const text = 'Aktywuj konto';

   return (
      <AbstractActivateAccountButton
         {...props}
         className={classes.root}
         text={text}
         url={confirmationURL}
      />
   );
};

export default ActivateAccountButton;
