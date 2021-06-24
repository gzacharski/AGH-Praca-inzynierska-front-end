import React, { useContext } from 'react';
import { ButtonGroup } from '@material-ui/core';
import {
   AvatarButton,
   DropDownButton,
   MessageButton,
   NotificationButton,
} from 'src/main/components/buttonGroups/personalMenu/buttons';
import { AuthContext } from 'src/main/auth';
import { avatar } from './buttons/avatar/testAvatar';

const PersonalMenu = () => {
   const context = useContext(AuthContext);

   return (
      context.isAuthenticated() && (
         <ButtonGroup data-testid="personal-menu">
            <AvatarButton avatar={avatar} />
            <MessageButton />
            <NotificationButton />
            <DropDownButton />
         </ButtonGroup>
      )
   );
};

export default PersonalMenu;
