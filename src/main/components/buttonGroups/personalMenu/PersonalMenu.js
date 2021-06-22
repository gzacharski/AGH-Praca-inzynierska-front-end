import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import {
   AvatarButton,
   DropDownButton,
   MessageButton,
   NotificationButton,
} from 'src/main/components/buttonGroups/personalMenu/buttons';
import { avatar } from './buttons/avatar/testAvatar';

const PersonalMenu = () => (
   <ButtonGroup data-testid="personal-menu">
      <AvatarButton avatar={avatar} />
      <MessageButton />
      <NotificationButton />
      <DropDownButton />
   </ButtonGroup>
);

export default PersonalMenu;
