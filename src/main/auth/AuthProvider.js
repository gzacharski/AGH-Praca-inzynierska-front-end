import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
   const [authState, setAuthState] = useState({
      token: null,
      expiresAt: null,
      userInfo: {},
   });

   const setAuthInfo = ({ token, expiresAt, userInfo }) => {
      setAuthState({ token, expiresAt, userInfo });
   };

   return (
      <AuthContext.Provider
         value={{
            authState,
            setAuthState: (authInfo) => setAuthInfo(authInfo),
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
