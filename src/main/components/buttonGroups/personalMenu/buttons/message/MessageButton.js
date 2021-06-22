import React from 'react';
import { Button, Badge } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import { useStyles } from './MessageButton.style';

const MessageButton = () => {
   const classes = useStyles();
   return (
      <Button className={classes.button} variant="text">
         <Badge badgeContent={2} color="secondary">
            <MailOutline />
         </Badge>
      </Button>
   );
};

export default MessageButton;
