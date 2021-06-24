import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'src/main/auth';

export const withAuthFilter = (Component) => {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   return (
      <>
         {token === null && <Redirect to="/login" />};
         <Component />
      </>
   );
};
