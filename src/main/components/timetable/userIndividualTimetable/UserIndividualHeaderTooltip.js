/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import { formatRelative } from 'date-fns';
import { pl } from 'date-fns/locale';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { AuthContext } from 'src/main/auth';
import {
   RatingDialog,
   CancelParticipationDialog,
} from 'src/main/components/dialogs';
import { UserEventMenu } from 'src/main/components/menu';
import {
   cancelUserIndividualReservation,
   rateUserIndividualEvent,
} from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';

export const CustomHeaderTooltip = ({ appointmentData, onHide }) => {
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
         <UserEventMenu
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
               dispatch(
                  cancelUserIndividualReservation({
                     trainingId: id,
                     userId,
                     token,
                  }),
               );
            }}
         />
         <RatingDialog
            openDialog={ratingDialog}
            setOpenDialog={setRatingDialog}
            dialogTitle="Oceń zajęcia"
            eventTitle={`${title}, ${workoutDate}`}
            callback={(value) =>
               dispatch(
                  rateUserIndividualEvent({
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

export const UserIndividualHeaderTooltip = ({
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
