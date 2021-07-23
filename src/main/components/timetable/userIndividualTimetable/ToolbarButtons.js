import React, { useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { IndividualWorkoutContext } from './IndividualWorkoutContex';
import { useStyles } from './ToolbarButtons.styles';

export const ToolbarButtons = ({ ...restProps }) => {
   const context = useContext(IndividualWorkoutContext);
   const { setOpenDialog } = context;
   const classes = useStyles();
   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <Tooltip
            title="Zapytanie o trening personalny"
            arrow
            placement="right"
         >
            <IconButton
               size="small"
               onClick={() => setOpenDialog((prevstate) => !prevstate)}
               className={classes.button}
            >
               <AddIcon />
            </IconButton>
         </Tooltip>
      </Toolbar.FlexibleSpace>
   );
};
