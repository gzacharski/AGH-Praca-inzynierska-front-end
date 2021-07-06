import React, { useEffect } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { selectUserInfo } from 'src/main/store/selectors';
import { AvatarIcon } from 'src/main/components/icons/avatar/AvatarIcon';
import {
   selectAvatar,
   fetchAvatar,
   selectStatus as selectAvatarStatus,
} from 'src/main/store/sliceFiles/avatarSlice';
import {
   fetchUserInfo,
   selectStatus as selectAccountStatus,
} from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store/status';
import { useStyles } from './AvatarButton.styles';

const AvatarButton = (props) => {
   const dispatch = useDispatch();
   const classes = useStyles();
   const avatar = useSelector(selectAvatar);
   const avatarStatus = useSelector(selectAvatarStatus);
   const accountStatus = useSelector(selectAccountStatus);
   const user = useSelector(selectUserInfo);

   useEffect(() => {
      if (avatarStatus === STATUS.IDLE) {
         dispatch(fetchAvatar());
      }
   }, [avatarStatus, dispatch]);

   useEffect(() => {
      if (accountStatus === STATUS.IDLE) {
         dispatch(fetchUserInfo());
      }
   }, [accountStatus, dispatch]);

   const handleAvatarClick = (history) => history.push('/account');

   const { name, surname } = user;

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Skeleton width="100%">
            <Button
               aria-controls="simple-menu"
               aria-haspopup="true"
               startIcon={<AvatarIcon avatar={avatar} user={user} />}
               variant="text"
               className={classes.button}
               data-testid="avatar-button-loading"
            />
         </Skeleton>
      );
   }

   return (
      name &&
      surname && (
         <Tooltip arrow title={`${name} ${surname}`} placement="bottom">
            <Button
               aria-controls="simple-menu"
               aria-haspopup="true"
               startIcon={<AvatarIcon avatar={avatar} user={user} />}
               variant="text"
               className={classes.button}
               onClick={() => handleAvatarClick(props.history)}
               data-testid="avatar-button"
            >
               {name}
            </Button>
         </Tooltip>
      )
   );
};

export default withRouter(AvatarButton);
