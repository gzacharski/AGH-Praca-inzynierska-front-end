/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
   Typography,
   Grid,
   Select,
   MenuItem,
   Avatar,
   TextField,
   FormControl,
   InputLabel,
   Button,
} from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { formatISO9075 } from 'date-fns';
import * as Yup from 'yup';
import {
   fetchEmployeesList,
   selectStatus,
   selectEntities,
} from 'src/main/store/sliceFiles/users/employeesSlice';
import {
   fetchTrainersList,
   selectStatus as selectTrainersStatus,
   selectEntities as selectTrainerEntities,
} from 'src/main/store/sliceFiles/users/trainersSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { TASK_STATUS } from 'src/main/data/taskStatus';
import { useStyles } from './TaskForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string()
      .required('Pole jest wymagane')
      .min(2, 'Minimalnie dwa znaki')
      .max(20, 'Tytuł może mieć maksymalnie 20 znaków.'),
   description: Yup.string()
      .required('Pole jest wymagane')
      .min(2, 'Minimalnie dwa znaki')
      .max(200, 'Opis może mieć maksymalnie 200 znaków.'),
});

export const TaskForm = ({
   taskId = '',
   title = '',
   description = '',
   selectedEmployee = '',
   priority = '',
   initStartDate = new Date(),
   initStartTime = new Date(),
   reduxCallback = () => false,
   buttonName = '',
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const employees = useSelector(selectEntities);
   const trainers = useSelector(selectTrainerEntities);

   const [startDate, setStartDate] = useState(initStartDate);
   const [startTime, setStartTime] = useState(initStartTime);

   const employeeStatus = useSelector(selectStatus);
   const trainerStatus = useSelector(selectTrainersStatus);

   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;

   useEffect(() => {
      if (employeeStatus === STATUS.IDLE) {
         dispatch(fetchEmployeesList({ token }));
      }
   }, [employeeStatus, dispatch]);

   useEffect(() => {
      if (trainerStatus === STATUS.IDLE) {
         dispatch(fetchTrainersList({ token }));
      }
   }, [trainerStatus, dispatch]);

   const formik = useFormik({
      initialValues: {
         title,
         description,
         selectedEmployee,
         priority,
      },
      validationSchema,
      onSubmit: (values) => {
         dispatch(
            reduxCallback({
               taskId,
               userId,
               employeeId: values?.selectedEmployee || '',
               priority: values?.priority?.id || '',
               title: values?.title || '',
               description: values?.description || '',
               startDate: formatISO9075(startDate, { representation: 'date' }),
               startTime: formatISO9075(startTime, { representation: 'time' }),
               token,
            }),
         );
         history.push('/manager/tasks');
      },
   });

   useEffect(() => {
      if (employees && trainers) {
         formik.setValues((state) => ({
            ...state,
            selectedEmployee: selectedEmployee?.userId || '',
         }));
      }
   }, [employees, trainers]);

   return (
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
         <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Tytuł"
                  name="title"
                  type="text"
                  defaultValue={formik.initialValues.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={
                     formik.touched.title && isNotEmpty(formik.errors.title)
                  }
                  helperText={formik.touched.title && formik.errors.title}
               />
            </Grid>
            <Grid item xs={6}>
               <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-mutiple-chip-label">
                     Wybierz pracownika
                  </InputLabel>
                  <Select
                     labelId="demo-mutiple-chip-label"
                     label="Wybierz pracownika"
                     value={formik.values.selectedEmployee}
                     onChange={(event) =>
                        formik.setValues((state) => ({
                           ...state,
                           selectedEmployee: event.target.value,
                        }))
                     }
                  >
                     <MenuItem value="" disabled>
                        Wybierz pracownika
                     </MenuItem>
                     {Object.values({ ...employees, ...trainers }).map(
                        (user) => (
                           <MenuItem key={user?.userId} value={user?.userId}>
                              <div className={classes.menuItem}>
                                 <Avatar
                                    className={classes.avatar}
                                    src={user?.avatar}
                                 >{`${user?.name?.[0]}${user?.surname?.[0]}`}</Avatar>
                                 <Typography>{`${user?.name} ${user?.surname}`}</Typography>
                              </div>
                           </MenuItem>
                        ),
                     )}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={6}>
               <FormControl variant="outlined" fullWidth>
                  <InputLabel id="task">Określ priorytet zadania</InputLabel>
                  <Select
                     labelId="task"
                     label="Określ priorytet zadania"
                     value={formik.values.priority}
                     onChange={(event) =>
                        formik.setValues((state) => ({
                           ...state,
                           priority: event.target.value,
                        }))
                     }
                  >
                     <MenuItem value="" disabled>
                        Określ priorytet zadania
                     </MenuItem>
                     {Object.values(TASK_STATUS).map((task) => (
                        <MenuItem key={task.id} value={task}>
                           {task.pl}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Opis"
                  name="description"
                  multiline
                  rows={3}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  error={
                     formik.touched.description &&
                     isNotEmpty(formik.errors.description)
                  }
                  helperText={
                     formik.touched.description && formik.errors.description
                  }
               />
            </Grid>
            <Grid item xs={6}>
               <Typography variant="subtitle1" color="primary">
                  Określ datę wykonania zadania
               </Typography>
               <DatePicker
                  autoOk
                  value={startDate}
                  onChange={setStartDate}
                  variant="static"
                  openTo="date"
                  orientation="landscape"
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
                  Określ godzinę wykonania zadania
               </Typography>
               <div>
                  <TimePicker
                     autoOk
                     value={startTime}
                     onChange={setStartTime}
                     ampm={false}
                     variant="static"
                     openTo="minutes"
                     orientation="landscape"
                     disablePast
                     minutesStep={5}
                  />
               </div>
            </Grid>
            <Grid item xs={12}>
               <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '5px' }}
               >
                  {buttonName}
               </Button>
            </Grid>
         </Grid>
      </form>
   );
};
