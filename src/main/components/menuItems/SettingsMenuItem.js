import React from 'react';
import { Settings } from '@material-ui/icons';
import AbstractMenuItem from './abstractMenuItem/AbstractMenuItem';

export const SettingsMenuItem = () => (
   <AbstractMenuItem
      itemName="Ustawienia"
      CustomIcon={Settings}
      pushUrl="/settings"
   />
);
