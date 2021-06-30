import React from 'react';
import { withRouter } from 'react-router-dom';
import { Badge, Button } from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';
import { useStyles } from './NotificationButton.styles';

const NotificationButton = (props) => {
   const classes = useStyles();
   const handleClick = (history) => history.push('/account/notifications');

   return (
      <Button
         className={classes.button}
         variant="text"
         data-testid="notification-button"
         onClick={() => handleClick(props.history)}
      >
         <Badge badgeContent={1} color="secondary">
            <NotificationsNone />
         </Badge>
      </Button>
   );
};

export default withRouter(NotificationButton);
