import React from 'react';
import { Help } from '@material-ui/icons';
import AbstractMenuItem from './abstractMenuItem/AbstractMenuItem';

export const HelpMenuItem = () => (
   <AbstractMenuItem
      itemName="Pomoc"
      CustomIcon={Help}
      pushUrl="/help"
   />
);
