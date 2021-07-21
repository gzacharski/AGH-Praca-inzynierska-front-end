import React from 'react';
import { Button, Badge, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { MailOutline } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStatus as selectAccountStatus } from 'src/main/store/sliceFiles/accountSlice';
import { STATUS } from 'src/main/store';
import { useStyles } from './MessageButton.style';

const MessageButton = (props) => {
   const accountStatus = useSelector(selectAccountStatus);
   const classes = useStyles();
   const handleClick = (history) => history.push('/messages');

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Skeleton
            data-testid="message-button-skeleton"
            className={classes.skeleton}
         />
      );
   }

   return (
      <Tooltip title="Wiadomości" arrow placement="bottom">
         <Button
            className={classes.button}
            variant="text"
            data-testid="message-button"
            onClick={() => handleClick(props.history)}
         >
            <Badge badgeContent={2} color="secondary">
               <MailOutline />
            </Badge>
         </Button>
      </Tooltip>
   );
};

export default withRouter(MessageButton);
