import React from 'react';
import { Badge, Button } from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';
import { useStyles } from './NotificationButton.styles';

const NotificationButton = () => {
   const classes = useStyles();
   return (
      <Button className={classes.button} variant="text">
         <Badge badgeContent={1} color="secondary">
            <NotificationsNone />
         </Badge>
      </Button>
   );
};

export default NotificationButton;
