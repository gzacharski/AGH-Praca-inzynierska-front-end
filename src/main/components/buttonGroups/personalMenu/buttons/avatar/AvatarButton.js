import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { AvatarIcon } from 'src/main/components/icons/avatar/AvatarIcon';
import { useStyles } from './AvatarButton.styles';

const AvatarButton = (props) => {
   const classes = useStyles();
   const { avatar } = props;

   const handleAvatarClick = (history) => history.push('/client');

   return (
      <Button
         aria-controls="simple-menu"
         aria-haspopup="true"
         startIcon={<AvatarIcon avatar={avatar} />}
         variant="text"
         className={classes.button}
         onClick={() => handleAvatarClick(props.history)}
         data-testid="avatar-button" 
      >
         {avatar.name}
      </Button>
   );
};

export default withRouter(AvatarButton);
