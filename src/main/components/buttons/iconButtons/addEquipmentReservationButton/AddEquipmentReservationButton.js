/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useStyles } from './AddEquipmentReservationButton.styles';

const AddEquipmentReservationButton = ({ onClick }) => {
   const classes = useStyles();
   return (
      <Tooltip title="Dodaj rezerwację sprzętu" arrow placement="right">
         <IconButton size="small" onClick={onClick} className={classes.button}>
            <AddIcon />
         </IconButton>
      </Tooltip>
   );
};

export { AddEquipmentReservationButton };
