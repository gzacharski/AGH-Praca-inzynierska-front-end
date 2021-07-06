import React from 'react';
import { Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectStatus as selectAvatarStatus } from 'src/main/store/sliceFiles/avatarSlice';
import { STATUS } from 'src/main/store/status';
import { useStyles } from './AvatarIcon.styles';

export const AvatarIcon = ({ avatar, user }) => {
   const classes = useStyles();
   const status = useSelector(selectAvatarStatus);

   if (user === null || status === STATUS.IDLE || status === STATUS.LOADING) {
      return (
         <Skeleton variant="circle">
            <Avatar className={classes.small} />
         </Skeleton>
      );
   }

   return (
      <Avatar
         alt={user && `${user?.name} ${user?.surname}`}
         src={
            avatar?.format &&
            avatar?.data &&
            `data:${avatar.format};base64, ${avatar.data}`
         }
         className={classes.small}
      >
         {user?.name[0]}
         {user?.surname[0]}
      </Avatar>
   );
};
