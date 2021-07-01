import React, { useContext } from 'react';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import { MeetingRoom } from '@material-ui/icons';
import { AuthContext } from 'src/main/auth';

export default function LogoutButton() {
   const authContext = useContext(AuthContext);

   return (
      <MenuItem data-testid="logout-btn" onClick={() => authContext.logout()}>
         <ListItemIcon>
            <MeetingRoom />
         </ListItemIcon>
         <Typography>Wyloguj się</Typography>
      </MenuItem>
   );
}
