/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { STATUS } from 'src/main/store';
import { useStyles } from './RefreshIconButton.styles';

export const RefreshIconButton = ({ onClick, status }) => {
   const classes = useStyles();
   const [clicked, setClicked] = useState(false);

   useEffect(() => {
      if (status !== STATUS.LOADING) setClicked(false);
   }, [status]);

   const handleClick = () => {
      setClicked(true);
      onClick();
   };

   return (
      <Tooltip title="Odśwież" arrow placement="right">
         <div className={classes.wrapper}>
            <IconButton
               size="small"
               onClick={handleClick}
               className={classes.button}
            >
               <RefreshIcon />
            </IconButton>
            {status === STATUS.LOADING && clicked && (
               <CircularProgress size={40} className={classes.progress} />
            )}
         </div>
      </Tooltip>
   );
};
