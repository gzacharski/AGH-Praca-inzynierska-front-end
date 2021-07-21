import React from 'react';
import { AccountCircle } from '@material-ui/icons';
import AbstractMenuItem from './abstractMenuItem/AbstractMenuItem';

export const AccountMenuItem = () => (
   <AbstractMenuItem
      itemName="Moje konto"
      CustomIcon={AccountCircle}
      pushUrl="/"
   />
);
