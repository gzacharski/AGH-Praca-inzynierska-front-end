import React from 'react';
import { Avatar } from '@material-ui/core';
import { useStyles } from './AvatarIcon.styles';

export const AvatarIcon = ({ avatar, user }) => {
   const classes = useStyles();
   const { format, data } = avatar;
   const { name, surname } = user;
   return (
      <Avatar
         src={format && data && `data:${format};base64, ${data}`}
         className={classes.small}
      >
         {name && name[0]}
         {surname && surname[0]}
      </Avatar>
   );
};
