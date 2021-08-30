/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useStyles } from './AddWorkoutButton.styles';

const AddWorkoutButton = ({ callback }) => {
   const classes = useStyles();
   return (
      <Tooltip title="Dodaj nowy trening" arrow placement="right">
         <IconButton size="small" onClick={callback} className={classes.button}>
            <AddIcon />
         </IconButton>
      </Tooltip>
   );
};

export { AddWorkoutButton };
