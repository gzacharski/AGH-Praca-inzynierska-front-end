import React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { AbstractNoContent } from './AbstractNoContent';

export const NoMessages = () => (
   <AbstractNoContent icon={MailOutlineIcon} title="Brak wiadomości" />
);
