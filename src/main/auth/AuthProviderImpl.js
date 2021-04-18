/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import React, { useState} from 'react';
import axios from 'axios';
import { userServiceURL } from 'src/main/data/urls';
import { AuthContext } from './AuthContext';

export const AuthProviderImpl = (props) => {
   const [authenticated, setAuthenticated] = useState(false);
   const [authorizationToken, setAuthorizationToken] = useState(null);

   const authenticate = (credentials) => {
      return axios
         .post(`${userServiceURL}/login`, credentials)
         .then((response) => {
            if (response.status.valueOf(200)) {
               setAuthenticated(true);
               setAuthorizationToken(response.headers.Authorization);
               return true;
            } else {
               throw new Error('Nieprawidłowe dane');
            }
         });
   };

   const signout = () => {
      setAuthenticated(false);
      setAuthorizationToken(null);
   };
   const { children } = props;
   return (
      <AuthContext.Provider
         value={{
            authenticated,
            authorizationToken,
            authenticate,
            signout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};