/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { formatRelative } from 'date-fns';
import { pl } from 'date-fns/locale';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useAuth } from 'src/main/auth';
import {
   RatingDialog,
   CancelParticipationDialog,
} from 'src/main/components/dialogs';
import { UserEventMenu } from 'src/main/components/menu';
import {
   cancelEquipmentReservationTitle,
   ratingEquipmentTooltipTitle,
} from 'src/main/components/menu/eventMenu/tooltipTitleUtils';
import {
   cancelUserEquipmentReservation,
   rateUserEquipmentEvent,
} from 'src/main/store/sliceFiles/timetable/userEquipmentReservationSlice';

export const CustomHeaderTooltip = ({ appointmentData, onHide }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [ratingDialog, setRatingDialog] = useState(false);
   const dispatch = useDispatch();

   const { token = '', userInfo = {} } = useAuth();
   const { userId = '' } = userInfo;

   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);

   const {
      id = '',
      title = '',
      startDate = '',
      rating = 2.5,
   } = appointmentData;

   const eventDate = formatRelative(Date.parse(startDate), Date.now(), {
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
         <UserEventMenu
            anchorEl={anchorEl}
            appointmentData={appointmentData}
            onClose={handleClose}
            setOpenDialog={setOpenDialog}
            setRatingDialog={setRatingDialog}
            cancelCallback={cancelEquipmentReservationTitle}
            rateCallback={ratingEquipmentTooltipTitle}
         />
         <CancelParticipationDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            dialogTitle="Czy na pewno chcesz zrezygnować z rezerwacji sprzętu treningowego?"
            eventTitle={`${title}, ${eventDate}`}
            callback={() => {
               onHide();
               dispatch(
                  cancelUserEquipmentReservation({
                     eventId: id,
                     userId,
                     token,
                  }),
               );
            }}
         />
         <RatingDialog
            openDialog={ratingDialog}
            setOpenDialog={setRatingDialog}
            dialogTitle="Oceń sprzęt"
            eventTitle={`${title}, ${eventDate}`}
            callback={(value) =>
               dispatch(
                  rateUserEquipmentEvent({
                     eventId: id,
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

export const UserEquipmentHeaderTooltip = ({
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
         <CustomHeaderTooltip
            appointmentData={appointmentData}
            onHide={onHide}
         />
      </AppointmentTooltip.Header>
   </>
);
