import React from 'react';
import { Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
   selectStatus as selectAvatarStatus,
   selectAvatar,
} from 'src/main/store/sliceFiles/avatarSlice';
import {
   selectStatus as selectAccountStatus,
   selectUserInfo,
} from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store';
import { useStyles } from './AvatarIcon.styles';

export const AvatarIcon = ({ huge, variant }) => {
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
      const variant2 = variant || 'circle';
      return (
         <Skeleton
            variant={variant2}
            data-testid="avatar-skeleton"
            className={clsx({
               [classes.small]: !huge,
               [classes.huge]: huge,
            })}
         >
            <Avatar
               className={clsx({
                  [classes.small]: !huge,
                  [classes.huge]: huge,
               })}
               variant={variant}
            />
         </Skeleton>
      );
   }

   const name = user?.name;
   const surname = user?.surname;
   const shouldRender = Boolean(name) && Boolean(surname);

   return (
      shouldRender && (
         <Avatar
            alt={`${name} ${surname}`}
            src={avatar}
            className={clsx({
               [classes.small]: !huge,
               [classes.huge]: huge,
            })}
            data-testid="avatar"
            variant={variant}
         >
            {name[0]}
            {surname[0]}
         </Avatar>
      )
   );
};
