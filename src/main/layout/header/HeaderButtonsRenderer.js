import React, { useContext } from 'react';
import { LoginButton } from 'src/main/components/buttons';
import { AuthContext } from 'src/main/auth';
import { PersonalMenu } from 'src/main/components/buttonGroups';

export const HeaderButtonsRenderer = () => {
   const authContext = useContext(AuthContext);

   if (authContext.isAuthenticated()) return <PersonalMenu />;
   return <LoginButton />;
};
