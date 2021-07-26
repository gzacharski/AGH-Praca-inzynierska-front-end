import React from 'react';
import { isPast, isFuture } from 'date-fns';
import { Menu, MenuItem, Fade, Tooltip } from '@material-ui/core';

export const UserEventMenu = ({
   appointmentData,
   onClose,
   anchorEl,
   setOpenDialog,
   setRatingDialog,
   cancelCallback,
   rateCallback,
}) => {
   const { startDate, endDate } = appointmentData;
   const cancelParticipationDisabled = isPast(Date.parse(startDate));
   const ratingDisabled = isFuture(Date.parse(endDate));

   return (
      <>
         <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
            TransitionComponent={Fade}
         >
            <Tooltip
               title={cancelCallback(startDate)}
               arrow
               enterDelay={700}
               leaveDelay={200}
               placement="right"
               disableHoverListener={!cancelParticipationDisabled}
            >
               <div>
                  <MenuItem
                     onClick={() => {
                        setOpenDialog((prevState) => !prevState);
                        onClose();
                     }}
                     disabled={cancelParticipationDisabled}
                  >
                     Zrezygnuj
                  </MenuItem>
               </div>
            </Tooltip>
            <Tooltip
               title={rateCallback(startDate)}
               arrow
               enterDelay={700}
               leaveDelay={200}
               placement="right"
               disableHoverListener={!ratingDisabled}
            >
               <div>
                  <MenuItem
                     onClick={() => {
                        setRatingDialog((prevState) => !prevState);
                        onClose();
                     }}
                     disabled={ratingDisabled}
                  >
                     Oceń
                  </MenuItem>
               </div>
            </Tooltip>
         </Menu>
      </>
   );
};
