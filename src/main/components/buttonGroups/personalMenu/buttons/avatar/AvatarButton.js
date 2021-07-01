import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
   selectAccountAvatar,
   selectAccountUserInfo,
} from 'src/main/store/selectors';
import { AvatarIcon } from 'src/main/components/icons/avatar/AvatarIcon';
import { useStyles } from './AvatarButton.styles';

const AvatarButton = (props) => {
   const classes = useStyles();
   const avatar = useSelector(selectAccountAvatar);
   const user = useSelector(selectAccountUserInfo);

   const handleAvatarClick = (history) => history.push('/account');

   const { name, surname } = user;

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
