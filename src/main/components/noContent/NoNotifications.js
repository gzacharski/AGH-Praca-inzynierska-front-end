import React from 'react';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import { AbstractNoContent } from './AbstractNoContent';

export const NoNotifications = () => (
   <AbstractNoContent
      icon={NotificationsNoneSharpIcon}
      title="Brak powiadomień"
   />
);
