/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { isPast, isFuture } from 'date-fns';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { cancelUserGroupReservation } from 'src/main/store/sliceFiles/timetable/userGroupReservationSlice';

const EventMenu = ({ appointmentData, onClose, anchorEl, setOpenDialog }) => {
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
               onClick={() => setOpenDialog((prevState) => !prevState)}
               disabled={cancelParticipationDisabled}
            >
               Zrezygnuj
            </MenuItem>
            <MenuItem disabled={ratingDisabled}>Oceń</MenuItem>
         </Menu>
      </>
   );
};

const CustomHeaderContent = ({ appointmentData }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const dispatch = useDispatch();

   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);

   const { id = '' } = appointmentData;

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
         />
         <SaveChangesDialog
            buttonText="Zrezygnuj"
            title="Czy na pewno chcesz zrezygnować z rezerwacji?"
            callback={() => {
               console.log(`Zrezygnowano z rezerwacji id: ${id}`);
               handleClose();
               dispatch(cancelUserGroupReservation({ trainingId: id }));
            }}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
         />
      </>
   );
};

export const UserGroupHeaderTooltip = ({ appointmentData, ...restProps }) => {
   const { id = '' } = appointmentData;
   console.log(id);
   return (
      <AppointmentTooltip.Header
         {...restProps}
         appointmentData={appointmentData}
         showDeleteButton
      >
         <CustomHeaderContent appointmentData={appointmentData} />
      </AppointmentTooltip.Header>
   );
};
