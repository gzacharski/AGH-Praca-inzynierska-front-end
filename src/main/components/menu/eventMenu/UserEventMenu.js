import React from 'react';
import { isPast, isFuture, differenceInMinutes } from 'date-fns';
import { Menu, MenuItem, Fade, Tooltip } from '@material-ui/core';

const cancelParticipationTitle = (startDate) => {
   const difference = differenceInMinutes(Date.parse(startDate), Date.now());

   if (difference <= 60 && difference > 0)
      return 'Nie można anulować uczestnistwa na godzinę przed rozpoczęciem zajęć.';

   return 'Nie można anuluwać uczestnistwa w zajęciach, które już się odbyły.';
};

const ratingTooltipTitle = (startDate) => {
   if (isFuture(Date.parse(startDate)))
      return 'Nie można oceniać zajęć przed ich rozpoczęciem.';
   return 'Oceny zajęć można dokonać wyłącznie w ciągu 7 dni od daty zakończenia zajęć.';
};

export const UserEventMenu = ({
   appointmentData,
   onClose,
   anchorEl,
   setOpenDialog,
   setRatingDialog,
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
               title={cancelParticipationTitle(startDate)}
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
               title={ratingTooltipTitle(startDate)}
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
