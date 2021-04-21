import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
   const history = useHistory();
   const token = localStorage.getItem('token');
   const useInfo = localStorage.getItem('userInfo');
   const expiresAt = localStorage.getItem('expiresAt');

   const [authState, setAuthState] = useState({
      token,
      expiresAt,
      userInfo: useInfo ? JSON.parse(useInfo) : {},
   });

   const setAuthInfo = (authInfo) => {
      // TODO: temporarily, need to change from localStorage to HttpOnly cookie
      localStorage.setItem('token', authInfo.token);
      localStorage.setItem('userInfo', JSON.stringify(authInfo.userInfo));
      localStorage.setItem('expiresAt', authInfo.expiresAt);
      setAuthState(authInfo);
   };

   const isAuthenticated = () => {
      if (!authState.token || !authState.expiresAt) return false;
      return new Date().getTime() / 1000 < authState.expiresAt;
   };

   const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expiresAt');
      setAuthState({
         token: null,
         expiresAt: null,
         userInfo: {},
      });
      history.push('/login');
   };

   return (
      <AuthContext.Provider
         value={{
            authState,
            setAuthState: (authInfo) => setAuthInfo(authInfo),
            isAuthenticated,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
