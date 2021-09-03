import React, { useContext, useEffect, useState } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   DialogContent,
   Typography,
   Divider,
   Button,
   Select,
   MenuItem,
} from '@material-ui/core';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useDispatch, useSelector } from 'react-redux';
import { acceptIndividualTraining } from 'src/main/store/sliceFiles/trainerSlices/trainerTimetableSlice';
import { useAuth } from 'src/main/auth';
import {
   selectAll as selectAllLocations,
   selectStatus as selectLocationStatus,
   fetchLocationList,
} from 'src/main/store/sliceFiles/locationsSlice';
import { STATUS } from 'src/main/store';
import { useStyles } from './AcceptRequestDialog.styles';

export const AcceptRequestDialog = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const locationStatus = useSelector(selectLocationStatus);
   const locations = useSelector(selectAllLocations);
   const [selectedLocation, setSelectedLocation] = useState('');

   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (locationStatus === STATUS.IDLE) {
         dispatch(fetchLocationList({ token }));
      }
   }, [locationStatus, dispatch]);

   const {
      dialogState = {},
      closeDialog = () => false,
      entityId = '',
   } = useContext(DialogContext);

   const { mode = DIALOG_MODE.INFO, isOpen = false } = dialogState;
   const shouldOpen = mode === DIALOG_MODE.ACCEPT && isOpen;

   const handleSubmit = () => {
      dispatch(
         acceptIndividualTraining({
            trainingId: entityId,
            userId,
            token,
            locationId: selectedLocation,
         }),
      );
      closeDialog();
   };

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Czy na pewno chcesz zaakceptować trening personalny?
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            <div>
               <Typography variant="subtitle1" color="primary">
                  Wybierz lokalizację
               </Typography>
               <Select
                  id="select-training-type"
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  className={classes.select}
                  displayEmpty
               >
                  <MenuItem value="" disabled>
                     Wybierz lokalizację
                  </MenuItem>
                  {locations.map((location) => {
                     const { locationId = '', name = '' } = location || {};
                     return (
                        <MenuItem key={locationId} value={locationId}>
                           {name}
                        </MenuItem>
                     );
                  })}
               </Select>
            </div>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleSubmit} className={classes.button}>
               Akceptuj
            </Button>
            <Button
               variant="contained"
               className={classes.button}
               onClick={closeDialog}
            >
               Anuluj
            </Button>
         </DialogActions>
      </Dialog>
   );
};
