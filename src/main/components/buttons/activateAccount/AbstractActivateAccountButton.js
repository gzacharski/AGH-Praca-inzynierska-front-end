import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { withRouter, useLocation } from 'react-router-dom';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const AbstractActivateAccountButton = (props) => {
   const { setMessage, setOnRequest, setStatus, url, text, className } = props;

   const params = useQuery();
   const token = params.get('token');

   const handleClick = () => {
      setOnRequest(true);
      axios
         .get(url, {
            headers: {
               'Accept-Language': 'pl',
            },
            params: {
               token,
            },
         })
         .then((response) => {
            setStatus(response.status);
            setMessage(response.data.message);
         })
         .catch((error) => {
            if (error.response === undefined) {
               setStatus(500);
               setMessage(
                  'Wystąpił problem z połączeniem z serwisem. Spróbuj ponownie później lub wypróbuj inne połączenie sieciowe.',
               );
            } else {
               setStatus(error.response?.status);
               setMessage(error.response?.data?.message);
            }
         })
         .finally(() => {
            // timeout for tests
            setTimeout(() => setOnRequest(false), 700);
         });
   };

   return (
      <Button
         color="inherit"
         role="button"
         onClick={() => handleClick()}
         className={className}
         variant="contained"
      >
         {text}
      </Button>
   );
};

export default withRouter(AbstractActivateAccountButton);
