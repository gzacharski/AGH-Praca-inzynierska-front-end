/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { authServiceURL } from 'src/main/data/urls';
import { useStyles } from './ActivateAccountRefreshButton.styles';
import AbstractActivateAccountButton from '../AbstractActivateAccountButton';

const ActivateAccountRefreshButton = (props) => {
   const classes = useStyles();
   const confirmationURL = `${authServiceURL}/users/refreshRegistration`;
   const text = 'Wyślij nowy link aktywacyjny';

   return (
      <AbstractActivateAccountButton
         {...props}
         className={classes.root}
         text={text}
         url={confirmationURL}
      />
   );
};

export default ActivateAccountRefreshButton;
