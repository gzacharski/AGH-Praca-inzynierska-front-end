import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useStyles } from './AbstractButton.styles';

const AbstractButton = ({ title, callback, editable, children }) => {
   const classes = useStyles();
   return (
      <Tooltip title={title} placement="bottom" arrow>
         <div>
            <IconButton
               className={classes.icon}
               onClick={callback}
               disabled={editable}
            >
               {children}
            </IconButton>
         </div>
      </Tooltip>
   );
};

export { AbstractButton };
