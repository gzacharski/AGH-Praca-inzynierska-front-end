/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { userServiceURL } from 'src/main/data/urls';
import { useStyles } from './ActivateAccountRefreshButton.styles';
import AbstractActivateAccountButton from '../AbstractActivateAccountButton';

const ActivateAccountRefreshButton = (props) => {
   const classes = useStyles();
   const confirmationURL = `${userServiceURL}/users/refreshRegistration`;
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
