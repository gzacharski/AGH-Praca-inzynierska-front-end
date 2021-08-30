import React, { useContext, useState, useEffect } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   DialogContent,
   Divider,
   Typography,
   Button,
   Grid,
   Select,
   MenuItem,
   CircularProgress,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { addMinutes, formatISO, isBefore, formatISO9075 } from 'date-fns';
import {
   selectAll,
   selectStatus,
   fetchEquipmentList,
} from 'src/main/store/sliceFiles/equipmentSlice';
import { addUserEquipmentReservation } from 'src/main/store/sliceFiles/timetable/userEquipmentReservationSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { UserEquipmentContext } from 'src/main/components/timetable/userEquipmentTimetable/UserEquipmentContext';
import { useStyles } from './EquipmentRequestDialog.styles';

const EquipmentRequestDialog = () => {
   const classes = useStyles();
   const context = useContext(UserEquipmentContext);
   const { openDialog, setOpenDialog } = context;
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(addMinutes(new Date(), 15));
   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   const [selectedEquipment, setSelectedEquipment] = useState('');
   const equipmentData = useSelector(selectAll);
   const equipmentStatus = useSelector(selectStatus);
   const dispatch = useDispatch();

   useEffect(() => {
      if (equipmentStatus === STATUS.IDLE) {
         dispatch(fetchEquipmentList({}));
      }
   }, [equipmentStatus, dispatch]);

   const handleEquipmentChange = (event) =>
      setSelectedEquipment(event.target.value);

   const handleAddReservation = () => {
      setOpenDialog(false);
      dispatch(
         addUserEquipmentReservation({
            equipmentId: selectedEquipment,
            startDateTime: formatISO(startDate).substring(0, 16),
            endDateTime: formatISO(endDate).substring(0, 16),
            userId,
            token,
         }),
      );
   };

   const isValid = () => {
      if (selectedEquipment === '') return false;
      if (isBefore(endDate, startDate)) return false;
      return true;
   };

   return (
      <Dialog
         open={openDialog}
         maxWidth="sm"
         fullWidth
         onClose={() => setOpenDialog(false)}
      >
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Rezerwacja sprzętu fitness
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            {equipmentStatus !== STATUS.IDLE ? (
               <Grid container>
                  <Grid item xs={6}>
                     <Typography variant="subtitle1" color="primary">
                        Sprzęt fitness
                     </Typography>
                     <Select
                        id="sprzet-fitness"
                        value={selectedEquipment}
                        onChange={handleEquipmentChange}
                        className={classes.select}
                        displayEmpty
                     >
                        <MenuItem value="" disabled>
                           Wybierz sprzęt fitness
                        </MenuItem>
                        {equipmentData.map((equipment) => (
                           <MenuItem
                              key={equipment.equipmentId}
                              value={equipment.equipmentId}
                           >
                              {equipment.title}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant="subtitle1" color="primary">
                        Data i godzina rozpoczęcia
                     </Typography>
                     <DateTimePicker
                        value={startDate}
                        onChange={setStartDate}
                        ampm={false}
                        autoOk
                        variant="inline"
                        disablePast
                        minutesStep={5}
                        minDate={new Date()}
                        minDateMessage={`Proszę wskazać datę późniejszą niż ${formatISO9075(
                           new Date(),
                        )}`}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant="subtitle1" color="primary">
                        Data i godzina zakończenia
                     </Typography>
                     <DateTimePicker
                        value={endDate}
                        onChange={setEndDate}
                        ampm={false}
                        autoOk
                        minDate={startDate}
                        minDateMessage={`Proszę wskazać datę późniejszą niż ${formatISO9075(
                           startDate,
                        )}`}
                        variant="inline"
                        disablePast
                        minutesStep={5}
                     />
                  </Grid>
               </Grid>
            ) : (
               <CircularProgress />
            )}
         </DialogContent>
         <Divider />
         <DialogActions>
            <Button
               onClick={handleAddReservation}
               className={classes.button}
               disabled={!isValid()}
            >
               Zarezerwuj
            </Button>
            <Button
               className={classes.button}
               onClick={() => setOpenDialog(false)}
            >
               Anuluj
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export { EquipmentRequestDialog };
