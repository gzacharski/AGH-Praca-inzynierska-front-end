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
   Avatar,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { addMinutes, formatISO, isBefore, formatISO9075 } from 'date-fns';
import {
   selectTrainers,
   fetchTrainerList,
   selectStatus,
} from 'src/main/store/sliceFiles/trainerListSlice';
import { addUserIndividualReservation } from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { IndividualWorkoutContext } from 'src/main/components/timetable/userIndividualTimetable/IndividualWorkoutContex';
import { useStyles } from './WorkoutRequestDialog.styles';

const WorkoutRequestDialog = () => {
   const classes = useStyles();

   const [selectedTrainer, setSelectedTrainer] = useState('');
   const trainers = useSelector(selectTrainers);
   const trainerStatus = useSelector(selectStatus);
   const dispatch = useDispatch();

   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(addMinutes(new Date(), 15));

   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   const { openDialog, setOpenDialog } = useContext(IndividualWorkoutContext);

   useEffect(() => {
      if (trainerStatus === STATUS.IDLE) {
         dispatch(fetchTrainerList({}));
      }
   }, [trainerStatus, dispatch]);

   const handleEquipmentChange = (event) =>
      setSelectedTrainer(event.target.value);

   const handleAddReservation = () => {
      setOpenDialog(false);
      dispatch(
         addUserIndividualReservation({
            trainerId: selectedTrainer,
            startDateTime: formatISO(startDate).substring(0, 16),
            endDateTime: formatISO(endDate).substring(0, 16),
            userId,
            token,
         }),
      );
   };

   const isValid = () => {
      if (selectedTrainer === '') return false;
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
               Zapytanie o trening personalny
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            {trainerStatus !== STATUS.IDLE ? (
               <Grid container>
                  <Grid item xs={6}>
                     <Typography variant="subtitle1" color="primary">
                        Sprzęt fitness
                     </Typography>
                     <Select
                        id="sprzet-fitness"
                        value={selectedTrainer}
                        onChange={handleEquipmentChange}
                        className={classes.select}
                        displayEmpty
                     >
                        <MenuItem value="" disabled>
                           Wybierz trenera
                        </MenuItem>
                        {trainers.map((trainer) => {
                           const {
                              name = '',
                              surname = '',
                              avatar = '',
                           } = trainer;

                           return (
                              <MenuItem
                                 key={trainer?.userId}
                                 value={trainer?.userId}
                              >
                                 <div className={classes.menuItem}>
                                    <Avatar
                                       className={classes.avatar}
                                       src={avatar}
                                    >{`${name?.[0] || ''}${
                                       surname?.[0] || ''
                                    }`}</Avatar>
                                    <Typography>{`${name} ${surname}`}</Typography>
                                 </div>
                              </MenuItem>
                           );
                        })}
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
               Wyślij zapytanie
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

export { WorkoutRequestDialog };
