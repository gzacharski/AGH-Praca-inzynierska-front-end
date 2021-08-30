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
   CircularProgress,
   Input,
   Chip,
   Avatar,
   TextField,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { ManagerWorkoutContext } from 'src/main/components/timetable/managerTimetable/ManagerWorkoutContext';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { addMinutes, isBefore, formatISO9075, format } from 'date-fns';
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
import { createGroupTraining } from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './AddWorkoutDialog.styles';

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

export const AddWorkoutDialog = () => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const [limit, setLimit] = useState(20);
   const [selectedLocation, setSelectedLocation] = useState('');
   const [selectedTrainers, setSelectedTrainers] = useState([]);
   const [selectedTrainingType, setSelectedTrainingType] = useState('');
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(addMinutes(new Date(), 15));

   const trainers = useSelector(selectAll);
   const trainerStatus = useSelector(selectStatus);

   const trainingTypes = useSelector(selectWorkouts);
   const workoutStatus = useSelector(selectWorkoutStatus);

   const locationStatus = useSelector(selectLocationStatus);
   const locations = useSelector(selectAllLocations);

   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const { openDialog, setOpenDialog } = useContext(ManagerWorkoutContext);

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

   const isValid = () => {
      if (
         selectedLocation === '' ||
         selectedTrainingType === '' ||
         selectedTrainers.length === 0 ||
         limit === '' ||
         limit === '0' ||
         isBefore(endDate, startDate)
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
      setOpenDialog(false);
      dispatch(
         createGroupTraining({
            trainingTypeId: selectedTrainingType,
            trainerIds: selectedTrainers.map(
               (trainer) => trainer?.userId || '',
            ),
            startDate: format(startDate, "yyyy-MM-dd'T'HH:mm"),
            endDate: format(endDate, "yyyy-MM-dd'T'HH:mm"),
            locationId: selectedLocation,
            limit: Number.parseInt(limit, 10),
            token,
         }),
      );
      setOpenDialog(false);
      resetState();
   };

   return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Dodaj nowy trening
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            {trainerStatus !== STATUS.IDLE ? (
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
                        value={startDate}
                        onChange={setStartDate}
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
                        value={endDate}
                        onChange={setEndDate}
                        ampm={false}
                        autoOk
                        fullWidth
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
               onClick={handleSubmit}
               className={classes.button}
               disabled={!isValid()}
            >
               Stwórz trening
            </Button>
            <Button
               variant="contained"
               className={classes.button}
               onClick={() => setOpenDialog(false)}
            >
               Anuluj
            </Button>
         </DialogActions>
      </Dialog>
   );
};
