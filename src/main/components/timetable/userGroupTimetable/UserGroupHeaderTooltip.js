/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import {
   isPast,
   isFuture,
   formatRelative,
   differenceInMinutes,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Menu, MenuItem, Fade, Tooltip } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { AuthContext } from 'src/main/auth';
import {
   RatingDialog,
   CancelParticipationDialog,
} from 'src/main/components/dialogs';
import {
   cancelUserGroupReservation,
   rateUserGroupEvent,
} from 'src/main/store/sliceFiles/timetable/userGroupReservationSlice';

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

const EventMenu = ({
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

export const CustomHeaderContent = ({ appointmentData, onHide }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [ratingDialog, setRatingDialog] = useState(false);
   const dispatch = useDispatch();
   const context = useContext(AuthContext);
   const { token = '', userInfo = {} } = context.authState;
   const { userId = '' } = userInfo;

   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);

   const {
      id = '',
      title = '',
      startDate = '',
      rating = 2.5,
   } = appointmentData;

   const workoutDate = formatRelative(Date.parse(startDate), Date.now(), {
      locale: pl,
      weekStartsOn: 1,
   });

   return (
      <>
         <IconButton
            aria-haspopup="true"
            onClick={(event) => handleClick(event)}
         >
            <MoreVert />
         </IconButton>
         <EventMenu
            anchorEl={anchorEl}
            appointmentData={appointmentData}
            onClose={handleClose}
            setOpenDialog={setOpenDialog}
            setRatingDialog={setRatingDialog}
         />
         <CancelParticipationDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            dialogTitle="Czy na pewno chcesz zrezygnować z rezerwacji na zajęcia?"
            eventTitle={`${title}, ${workoutDate}`}
            callback={() => {
               onHide();
               dispatch(cancelUserGroupReservation({ trainingId: id }));
            }}
         />
         <RatingDialog
            openDialog={ratingDialog}
            setOpenDialog={setRatingDialog}
            dialogTitle="Oceń zajęcia"
            eventTitle={`${title}, ${workoutDate}`}
            callback={(value) =>
               dispatch(
                  rateUserGroupEvent({
                     trainingId: id,
                     rating: value,
                     userId,
                     token,
                  }),
               )
            }
            rating={rating}
         />
      </>
   );
};

export const UserGroupHeaderTooltip = ({
   appointmentData,
   onHide,
   ...restProps
}) => (
   <>
      <AppointmentTooltip.Header
         {...restProps}
         onHide={onHide}
         appointmentData={appointmentData}
      >
         <CustomHeaderContent
            appointmentData={appointmentData}
            onHide={onHide}
         />
      </AppointmentTooltip.Header>
   </>
);
