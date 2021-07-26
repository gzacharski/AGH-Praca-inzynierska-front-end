/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useStyles } from './AddIndividualWorkoutButton.styles';

const AddIndividualWorkoutButton = ({ callback }) => {
   const classes = useStyles();
   return (
      <Tooltip title="Zapytanie o trening personalny" arrow placement="right">
         <IconButton size="small" onClick={callback} className={classes.button}>
            <AddIcon />
         </IconButton>
      </Tooltip>
   );
};

export { AddIndividualWorkoutButton };
