import React, { useEffect } from 'react';
import { Button, Badge, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { MailOutline } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStatus as selectAccountStatus } from 'src/main/store/sliceFiles/accountSlice';
import {
   fetchMessages,
   selectStatus,
   selectMessages,
} from 'src/main/store/sliceFiles/messagesSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './MessageButton.style';

const MessageButton = (props) => {
   const accountStatus = useSelector(selectAccountStatus);
   const classes = useStyles();
   const handleClick = (history) => history.push('/messages');

   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const messages = useSelector(selectMessages);

   const { authState } = useAuth();
   const { userInfo = {}, token = '' } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchMessages({ userId, token }));
      }
   }, [status, dispatch]);

   if (accountStatus === STATUS.IDLE || accountStatus === STATUS.LOADING) {
      return (
         <Skeleton
            data-testid="message-button-skeleton"
            className={classes.skeleton}
         />
      );
   }

   const messagesToRead = messages.filter(
      (message) => !message.markAsRead,
   ).length;

   return (
      <Tooltip title="Wiadomości" arrow placement="bottom">
         <Button
            className={classes.button}
            variant="text"
            data-testid="message-button"
            onClick={() => handleClick(props.history)}
         >
            <Badge badgeContent={messagesToRead} color="secondary">
               <MailOutline />
            </Badge>
         </Button>
      </Tooltip>
   );
};

export default withRouter(MessageButton);
