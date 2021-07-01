import React from 'react';
import { MenuList, Divider } from '@material-ui/core';
import {
   AccountMenuItem,
   HelpMenuItem,
   LogoutItem,
   SettingsMenuItem,
} from 'src/main/components/menuItems';
import { useStyles } from './LogoutList.styles';

const LogoutList = () => {
   const classes = useStyles();
   return (
      <div className={classes.paper}>
         <MenuList>
            <AccountMenuItem />
            <Divider />
            <HelpMenuItem />
            <SettingsMenuItem />
            <Divider />
            <LogoutItem />
         </MenuList>
      </div>
   );
};

export default LogoutList;
