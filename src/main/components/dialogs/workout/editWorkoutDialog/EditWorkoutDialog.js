/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Typography,
   Divider,
   Button,
   Grid,
   Select,
   MenuItem,
   FormControlLabel,
   Switch,
   Input,
   Chip,
   Avatar,
   TextField,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import {
   addMinutes,
   isBefore,
   formatISO9075,
   format,
   parseISO,
} from 'date-fns';
import {
   fetchTrainersList,
   selectStatus,
   selectAll,
} from 'src/main/store/sliceFiles/users/trainersSlice';
import {
   selectAll as selectAllLocations,
   selectStatus as selectLocationStatus,
   fetchLocationList,
} from 'src/main/store/sliceFiles/locationsSlice';
import {
   fetchWorkoutList,
   selectWorkouts,
   selectStatus as selectWorkoutStatus,
} from 'src/main/store/sliceFiles/workoutSlice';
import {
   updateGroupTraining,
   selectEntities,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './EditWorkoutDialog.styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const CustomNumberFormat = ({ inputRef, onChange, name, ...other }) => (
   <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
         onChange({
            target: {
               name,
               value: values.value,
            },
         });
      }}
      decimalScale={0}
      allowNegative={false}
      thousandSeparator=" "
      decimalSeparator=","
      isNumericString
      allowLeadingZeros={false}
      isAllowed={(inputObj) => inputObj?.value <= 1000}
   />
);

export const EditWorkoutDialog = () => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const [limit, setLimit] = useState(20);
   const [selectedLocation, setSelectedLocation] = useState('');
   const [selectedTrainers, setSelectedTrainers] = useState([]);
   const [selectedTrainingType, setSelectedTrainingType] = useState('');
   const [startDateToEdit, setStartDateToEdit] = useState(new Date());
   const [endDateToEdit, setEndDateToEdit] = useState(
      addMinutes(new Date(), 15),
   );
   const [sendEmails, setSendEmails] = useState(false);

   const trainers = useSelector(selectAll);
   const trainerStatus = useSelector(selectStatus);

   const trainingTypes = useSelector(selectWorkouts);
   const workoutStatus = useSelector(selectWorkoutStatus);

   const locationStatus = useSelector(selectLocationStatus);
   const locations = useSelector(selectAllLocations);

   const allTrainings = useSelector(selectEntities);

   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const {
      dialogState = {},
      closeDialog = () => false,
      entityId = '',
   } = useContext(DialogContext);

   useEffect(() => {
      if (trainerStatus === STATUS.IDLE) {
         dispatch(fetchTrainersList({ token }));
      }
      if (workoutStatus === STATUS.IDLE) {
         dispatch(fetchWorkoutList({ token }));
      }
      if (locationStatus === STATUS.IDLE) {
         dispatch(fetchLocationList({ token }));
      }
   }, [trainerStatus, workoutStatus, locationStatus, dispatch]);

   const { mode = DIALOG_MODE.INFO, isOpen = false } = dialogState;
   const shouldOpen = mode === DIALOG_MODE.EDIT && isOpen;

   useEffect(() => {
      if (isOpen === true && entityId !== '') {
         const trainingToEdit = allTrainings[entityId];
         const { startDate, endDate, location, title } = trainingToEdit;
         const locationId = locations.filter(
            (theLocation) => theLocation?.name === location,
         )?.[0].locationId;
         const trainingTypeId =
            trainingTypes.filter((type) => type?.name === title)?.[0]
               ?.trainingTypeId || '';

         setStartDateToEdit(parseISO(startDate));
         setEndDateToEdit(parseISO(endDate));
         setSelectedLocation(locationId);
         setSelectedTrainingType(trainingTypeId);
      }
   }, [entityId]);

   const isValid = () => {
      if (
         selectedLocation === '' ||
         selectedTrainingType === '' ||
         selectedTrainers.length === 0 ||
         limit === '' ||
         limit === '0' ||
         isBefore(endDateToEdit, startDateToEdit)
      ) {
         return false;
      }
      return true;
   };

   const resetState = () => {
      setSelectedLocation('');
      setSelectedTrainers([]);
      setSelectedTrainingType('');
      setLimit(20);
   };

   const handleSubmit = () => {
      dispatch(
         updateGroupTraining({
            trainingId: entityId,
            trainingTypeId: selectedTrainingType,
            trainerIds: selectedTrainers.map(
               (trainer) => trainer?.userId || '',
            ),
            startDate: format(startDateToEdit, "yyyy-MM-dd'T'HH:mm"),
            endDate: format(endDateToEdit, "yyyy-MM-dd'T'HH:mm"),
            locationId: selectedLocation,
            limit: Number.parseInt(limit, 10),
            shouldSendEmails: sendEmails,
            token,
         }),
      );
      closeDialog();
      resetState();
   };

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Edytuj trening
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            <Grid container spacing={2}>
               <Grid item xs={4}>
                  <Typography variant="subtitle1" color="primary">
                     Wybierz typ treningu
                  </Typography>
                  <Select
                     id="select-training-type"
                     value={selectedTrainingType}
                     onChange={(event) =>
                        setSelectedTrainingType(event.target.value)
                     }
                     className={classes.select}
                     displayEmpty
                  >
                     <MenuItem value="" disabled>
                        Wybierz typ treningu
                     </MenuItem>
                     {trainingTypes.map((trainingType) => (
                        <MenuItem
                           key={trainingType?.trainingTypeId}
                           value={trainingType?.trainingTypeId}
                        >
                           {trainingType?.name}
                        </MenuItem>
                     ))}
                  </Select>
               </Grid>
               <Grid item xs={4}>
                  <Typography variant="subtitle1" color="primary">
                     Wybierz lokalizację
                  </Typography>
                  <Select
                     id="select-training-type"
                     value={selectedLocation}
                     onChange={(event) =>
                        setSelectedLocation(event.target.value)
                     }
                     className={classes.select}
                     displayEmpty
                  >
                     <MenuItem value="" disabled>
                        Wybierz lokalizację
                     </MenuItem>
                     {locations.map((location) => (
                        <MenuItem
                           key={location?.locationId}
                           value={location?.locationId}
                        >
                           {location?.name}
                        </MenuItem>
                     ))}
                  </Select>
               </Grid>
               <Grid item xs={4}>
                  <Typography variant="subtitle1" color="primary">
                     Max. liczba osób
                  </Typography>
                  <TextField
                     placeholder="Max. liczba osób"
                     fullWidth
                     className={classes.select}
                     onChange={(event) => setLimit(event.target.value)}
                     value={limit}
                     InputProps={{
                        inputComponent: CustomNumberFormat,
                     }}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary">
                     Wybierz trenera lub trenerów
                  </Typography>
                  <Select
                     labelId="demo-mutiple-chip-label"
                     id="demo-mutiple-chip"
                     multiple
                     value={selectedTrainers}
                     onChange={(event) =>
                        setSelectedTrainers(event.target.value)
                     }
                     className={classes.select}
                     input={<Input />}
                     renderValue={(selected) => (
                        <div className={classes.chips}>
                           {selected.map((value) => (
                              <Chip
                                 key={value?.userId}
                                 avatar={
                                    <Avatar
                                       src={value?.avatar}
                                    >{`${value?.name?.[0]}${value?.surname?.[0]}`}</Avatar>
                                 }
                                 label={`${value?.name} ${value?.surname}`}
                                 className={classes.chip}
                              />
                           ))}
                        </div>
                     )}
                     MenuProps={MenuProps}
                  >
                     <MenuItem value="" disabled>
                        Wybierz trenera
                     </MenuItem>
                     {trainers.map((user) => (
                        <MenuItem key={user?.userId} value={user}>
                           <div className={classes.menuItem}>
                              <Avatar
                                 className={classes.avatar}
                                 src={user?.avatar}
                              >{`${user?.name?.[0]}${user?.surname?.[0]}`}</Avatar>
                              <Typography>{`${user?.name} ${user?.surname}`}</Typography>
                           </div>
                        </MenuItem>
                     ))}
                  </Select>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="subtitle1" color="primary">
                     Data i godzina rozpoczęcia
                  </Typography>
                  <DateTimePicker
                     value={startDateToEdit}
                     onChange={setStartDateToEdit}
                     ampm={false}
                     autoOk
                     variant="inline"
                     disablePast
                     fullWidth
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
                     value={endDateToEdit}
                     onChange={setEndDateToEdit}
                     ampm={false}
                     autoOk
                     fullWidth
                     minDate={startDateToEdit}
                     minDateMessage={`Proszę wskazać datę późniejszą niż ${formatISO9075(
                        startDateToEdit,
                     )}`}
                     variant="inline"
                     disablePast
                     minutesStep={5}
                  />
               </Grid>
               <Grid item xs={12}>
                  <div
                     style={{
                        verticalAlign: 'middle',
                        height: '100%',
                        display: 'flex',
                     }}
                  >
                     <FormControlLabel
                        control={
                           <Switch
                              checked={sendEmails}
                              onChange={(event) =>
                                 setSendEmails(event.target.checked)
                              }
                           />
                        }
                        label="Wyślij email do wszystkich uczestników z powiadomienie o zmianach mailem"
                     />
                  </div>
               </Grid>
            </Grid>
         </DialogContent>
         <Divider />
         <DialogActions>
            <Button
               onClick={handleSubmit}
               className={classes.button}
               disabled={!isValid()}
            >
               Zaktualizuj trening
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
