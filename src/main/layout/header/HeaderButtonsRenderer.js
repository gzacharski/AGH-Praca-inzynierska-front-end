import React, { useContext } from 'react';
import { LoginButton, LogoutButton } from 'src/main/components/buttons';
import { AuthContext } from 'src/main/auth';

export const HeaderButtonsRenderer = () => {
   const authContext = useContext(AuthContext);

   if (authContext.isAuthenticated()) return <LogoutButton />;
   return <LoginButton />;
};
