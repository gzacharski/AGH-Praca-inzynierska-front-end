/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { isPast, isFuture, formatRelative } from 'date-fns';
import { pl } from 'date-fns/locale';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
   RatingDialog,
   CancelParticipationDialog,
} from 'src/main/components/dialogs';
import { cancelUserGroupReservation } from 'src/main/store/sliceFiles/timetable/userGroupReservationSlice';

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
            <MenuItem
               onClick={() => {
                  setOpenDialog((prevState) => !prevState);
                  onClose();
               }}
               disabled={cancelParticipationDisabled}
            >
               Zrezygnuj
            </MenuItem>
            <MenuItem
               onClick={() => {
                  setRatingDialog((prevState) => !prevState);
                  onClose();
               }}
               disabled={ratingDisabled}
            >
               Oceń
            </MenuItem>
         </Menu>
      </>
   );
};

export const CustomHeaderContent = ({ appointmentData, onHide }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [ratingDialog, setRatingDialog] = useState(false);
   const dispatch = useDispatch();

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
            callback={(value) => console.log(`Ocena: ${value}`)}
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
