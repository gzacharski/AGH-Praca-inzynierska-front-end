import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { withRouter, useLocation } from 'react-router-dom';
import { userServiceURL } from 'src/main/data/urls';
import { useStyles } from './ActivateAccountButton.styles';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const ActivateAccountButton = (props) => {
   const classes = useStyles();
   const { setMessage, setSuccess, setOnRequest } = props;

   const params = useQuery();
   const token = params.get('token');
   const confirmationURL = `${userServiceURL}/users/confirmRegistration`;

   const handleClick = () => {
      setOnRequest(true);
      axios
         .get(confirmationURL, {
            headers: {
               'Accept-Language': 'pl',
            },
            params: {
               token,
            },
         })
         .then((response) => {
            if (response.status === 200) {
               setSuccess(true);
            } else {
               setSuccess(false);
            }
            setMessage(response.data.message);
         })
         .catch((error) => {
            setSuccess(false);
            setMessage(error);
         })
         .finally(() => setOnRequest(false));
   };

   return (
      <Button
         color="inherit"
         role="button"
         onClick={() => handleClick()}
         className={classes.root}
         variant="contained"
      >
         Aktywuj konto
      </Button>
   );
};

export default withRouter(ActivateAccountButton);
