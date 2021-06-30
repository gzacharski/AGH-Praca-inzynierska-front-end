import React from 'react';
import { connect } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { AvatarIcon } from 'src/main/components/icons/avatar/AvatarIcon';
import { useStyles } from './AvatarButton.styles';

const AvatarButton = (props) => {
   const classes = useStyles();
   const { avatar, user } = props;

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

const mapStateToProps = (store) => {
   const { avatar, user } = store.modelData.account;
   return {
      avatar,
      user,
   };
};

export default connect(mapStateToProps, null)(withRouter(AvatarButton));
