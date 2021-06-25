import React from 'react';
import { Avatar } from '@material-ui/core';
import { useStyles } from './AvatarIcon.styles';

export const AvatarIcon = ({ avatar }) => {
   const classes = useStyles();
   const { name, surname, image } = avatar;
   return (
      <Avatar
         src={image && `data:${image.format};base64, ${image.data}`}
         className={classes.small}
      >
         {name[0]}
         {surname[0]}
      </Avatar>
   );
};
