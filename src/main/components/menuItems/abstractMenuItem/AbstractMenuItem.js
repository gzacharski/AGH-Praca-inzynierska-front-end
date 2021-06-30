import React from 'react';
import { withRouter } from 'react-router-dom';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';

export default withRouter((props) => {
   const { itemName, CustomIcon, pushUrl } = props;
   const handleClick = (history) => {
      if (pushUrl) history.push(pushUrl);
   };
   return (
      <MenuItem onClick={() => handleClick(props.history)}>
         <ListItemIcon>
            <CustomIcon />
         </ListItemIcon>
         <Typography variant="inherit">{itemName}</Typography>
      </MenuItem>
   );
});

