/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import { isPast, isFuture, subDays } from 'date-fns';
import { STATUS } from 'src/main/store';
import { useStyles } from './JointEventIconButton.styles';
import { joinEventTooltipTitle } from './joinEventTooltipTitle';

export const JoinEventIconButton = ({ startDate, onClick, status }) => {
   const classes = useStyles();
   const [clicked, setClicked] = useState(false);
   const joinEventDisabled =
      isPast(Date.parse(startDate)) ||
      isFuture(subDays(Date.parse(startDate), 7));

   useEffect(() => {
      if (status !== STATUS.LOADING) setClicked(false);
   }, [status]);

   const handleClick = () => {
      setClicked(true);
      onClick();
   };

   return (
      <Tooltip
         title={joinEventTooltipTitle(startDate)}
         arrow
         placement="bottom"
      >
         <div>
            <IconButton
               aria-haspopup="true"
               onClick={handleClick}
               disabled={joinEventDisabled}
            >
               <PersonAddIcon />
            </IconButton>
            {status === STATUS.LOADING && clicked && (
               <CircularProgress size={45} className={classes.progress} />
            )}
         </div>
      </Tooltip>
   );
};
