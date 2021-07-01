import React from 'react';
import { Button, Badge, Tooltip } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useStyles } from './MessageButton.style';

const MessageButton = (props) => {
   const classes = useStyles();
   const handleClick = (history) => history.push('/account/messages');

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
