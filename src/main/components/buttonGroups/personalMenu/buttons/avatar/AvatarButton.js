import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { AvatarIcon } from 'src/main/components/icons/avatar/AvatarIcon';
import {
   selectStatus as selectAccountStatus,
   selectUserInfo,
} from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store';
import { useStyles } from './AvatarButton.styles';

const AvatarButton = (props) => {
   const classes = useStyles();
   const accountStatus = useSelector(selectAccountStatus);
   const user = useSelector(selectUserInfo);

   const handleAvatarClick = (history) => history.push('/');

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            startIcon={<AvatarIcon />}
            variant="text"
            className={classes.skeleton}
            data-testid="avatar-button-skeleton"
            disabled
         >
            <Skeleton width="100%" data-testid="avatar-button-skeleton-text" />
         </Button>
      );
   }

   const name = user?.name;
   const surname = user?.surname;
   const shouldRender = Boolean(name) && Boolean(surname);

   return (
      shouldRender && (
         <Tooltip arrow title={`${name} ${surname}`} placement="bottom">
            <Button
               aria-controls="simple-menu"
               aria-haspopup="true"
               startIcon={<AvatarIcon />}
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
