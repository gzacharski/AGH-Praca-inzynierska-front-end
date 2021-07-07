import React from 'react';
import { Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import {
   selectStatus as selectAvatarStatus,
   selectAvatar,
} from 'src/main/store/sliceFiles/avatarSlice';
import {
   selectStatus as selectAccountStatus,
   selectUserInfo,
} from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store/status';
import { useStyles } from './AvatarIcon.styles';

export const AvatarIcon = () => {
   const classes = useStyles();
   const avatarStatus = useSelector(selectAvatarStatus);
   const accountStatus = useSelector(selectAccountStatus);
   const avatar = useSelector(selectAvatar);
   const user = useSelector(selectUserInfo);

   if (
      accountStatus === STATUS.IDLE ||
      accountStatus === STATUS.LOADING ||
      avatarStatus === STATUS.IDLE ||
      avatarStatus === STATUS.LOADING
   ) {
      return (
         <Skeleton variant="circle" data-testid="avatar-skeleton">
            <Avatar className={classes.small} />
         </Skeleton>
      );
   }

   return (
      accountStatus === STATUS.SUCCEEDED && (
         <Avatar
            alt={user && `${user?.name} ${user?.surname}`}
            src={
               avatar?.format &&
               avatar?.data &&
               `data:${avatar.format};base64, ${avatar.data}`
            }
            className={classes.small}
            data-testid="avatar"
         >
            {user?.name && user.name[0]}
            {user?.surname && user.surname[0]}
         </Avatar>
      )
   );
};
