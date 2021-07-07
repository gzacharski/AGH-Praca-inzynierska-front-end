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

   const name = user?.name;
   const surname = user?.surname;
   const shouldRender = Boolean(name) && Boolean(surname);

   const format = avatar?.format;
   const data = avatar?.data;
   const shouldRenderData = Boolean(format) && Boolean(data);

   return (
      accountStatus === STATUS.SUCCEEDED &&
      shouldRender && (
         <Avatar
            alt={`${name} ${surname}`}
            src={shouldRenderData && `data:${format};base64, ${data}`}
            className={classes.small}
            data-testid="avatar"
         >
            {name[0]}
            {surname[0]}
         </Avatar>
      )
   );
};
