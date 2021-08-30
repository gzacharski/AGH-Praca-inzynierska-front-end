/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { isPast } from 'date-fns';
import { STATUS } from 'src/main/store';
import { useStyles } from './EditEventIconButton.styles';

export const EditEventIconButton = ({ startDate, onClick, status }) => {
   const classes = useStyles();
   const [clicked, setClicked] = useState(false);
   const editEventDisabled = isPast(Date.parse(startDate));

   useEffect(() => {
      if (status !== STATUS.LOADING) setClicked(false);
   }, [status]);

   const handleClick = () => {
      setClicked(true);
      onClick();
   };

   return (
      <Tooltip title="Edytuj wydarzenie" arrow placement="bottom">
         <div>
            <IconButton
               aria-haspopup="true"
               onClick={handleClick}
               disabled={editEventDisabled}
            >
               <EditIcon />
            </IconButton>
            {status === STATUS.LOADING && clicked && (
               <CircularProgress size={45} className={classes.progress} />
            )}
         </div>
      </Tooltip>
   );
};
