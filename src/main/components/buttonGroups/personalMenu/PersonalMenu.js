import React, { useContext, useEffect } from 'react';
import { ButtonGroup } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchAvatarUrl,
   selectStatus as selectAvatarStatus,
} from 'src/main/store/sliceFiles/avatarSlice';
import {
   fetchUserInfo,
   selectStatus as selectAccountStatus,
} from 'src/main/store/sliceFiles/accountSlice';
import {
   AvatarButton,
   DropDownButton,
   NotificationButton,
} from 'src/main/components/buttonGroups/personalMenu/buttons';
import { STATUS } from 'src/main/store';
import { AuthContext } from 'src/main/auth';

const PersonalMenu = () => {
   const context = useContext(AuthContext);
   const dispatch = useDispatch();
   const avatarStatus = useSelector(selectAvatarStatus);
   const accountStatus = useSelector(selectAccountStatus);

   const isAuthenticated = context.isAuthenticated();

   useEffect(() => {
      if (isAuthenticated && avatarStatus === STATUS.IDLE) {
         const { userInfo } = context.authState;
         const { userId } = userInfo;
         dispatch(fetchAvatarUrl({ userId }));
      }
   }, [avatarStatus, dispatch]);

   useEffect(() => {
      if (isAuthenticated && accountStatus === STATUS.IDLE) {
         dispatch(fetchUserInfo());
      }
   }, [accountStatus, dispatch]);

   return (
      isAuthenticated && (
         <ButtonGroup data-testid="personal-menu">
            <AvatarButton />
            <NotificationButton />
            <DropDownButton />
         </ButtonGroup>
      )
   );
};

export default PersonalMenu;
