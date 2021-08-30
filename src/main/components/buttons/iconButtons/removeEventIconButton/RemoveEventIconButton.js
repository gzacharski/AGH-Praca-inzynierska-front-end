/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { isPast } from 'date-fns';
import { STATUS } from 'src/main/store';
import { useStyles } from './RemoveEventIconButton.styles';

export const RemoveEventIconButton = ({ startDate, onClick, status }) => {
   const classes = useStyles();
   const [clicked, setClicked] = useState(false);
   const deleteEventDisabled = isPast(Date.parse(startDate));

   useEffect(() => {
      if (status !== STATUS.LOADING) setClicked(false);
   }, [status]);

   const handleClick = () => {
      setClicked(true);
      onClick();
   };

   return (
      <Tooltip title="Usuń wydarzenie" arrow placement="bottom">
         <div>
            <IconButton
               aria-haspopup="true"
               onClick={handleClick}
               disabled={deleteEventDisabled}
            >
               <DeleteIcon />
            </IconButton>
            {status === STATUS.LOADING && clicked && (
               <CircularProgress size={45} className={classes.progress} />
            )}
         </div>
      </Tooltip>
   );
};
