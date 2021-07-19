import React from 'react';
import { Avatar, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { AvatarGroup } from '@material-ui/lab';
import { useStyles } from './UserAvatars.styles';

const UserAvatars = ({ users, setOpen }) => {
   const classes = useStyles();
   return users && users.length > 0 ? (
      <AvatarGroup
         max={4}
         spacing="small"
         onClick={() => Boolean(users) && setOpen((prevState) => !prevState)}
         className={clsx({
            [classes.group]: Boolean(users),
         })}
      >
         {users.map((user) => {
            const {
               name = ' ',
               surname = ' ',
               avatar = '',
               userId = '',
            } = user;
            return (
               <Tooltip
                  key={userId}
                  title={`${name} ${surname}`}
                  placement="bottom"
                  arrow
               >
                  <Avatar alt={`${name} ${surname}`} src={avatar}>
                     {`${name[0]}${surname[0]}`}
                  </Avatar>
               </Tooltip>
            );
         })}
      </AvatarGroup>
   ) : (
      <Typography>Brak uczestników.</Typography>
   );
};

export { UserAvatars };
