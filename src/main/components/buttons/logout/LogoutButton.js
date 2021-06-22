import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';
import { AuthContext } from 'src/main/auth';

export default function LogoutButton() {
   const authContext = useContext(AuthContext);

   return (
      <MenuItem
         data-testid="logout-btn"
         onClick={() => authContext.logout()}
      >
         Wyloguj się
      </MenuItem>
   );
}
