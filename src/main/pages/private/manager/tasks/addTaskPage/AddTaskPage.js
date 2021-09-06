/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
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
import NumberFormat from 'react-number-format';
import { formatISO9075 } from 'date-fns';
import * as Yup from 'yup';
import {
   fetchEmployeesList,
   selectStatus,
   selectAll,
} from 'src/main/store/sliceFiles/users/employeesSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './AddTaskPage.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
   description: Yup.string().required('Pole jest wymagane'),
});

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

const AddTaskPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const [selectedTrainer, setSelectedTrainer] = useState([]);
   const [startDate, setStartDate] = useState(new Date());
   const [startTime, setStartTime] = useState(new Date());

   const employees = useSelector(selectAll);
   const employeeStatus = useSelector(selectStatus);

   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   useEffect(() => {
      if (employeeStatus === STATUS.IDLE) {
         dispatch(fetchEmployeesList({ token }));
      }
   }, [employeeStatus, dispatch]);

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         selectedTrainer,
      },
      validationSchema,
      onSubmit: (values) => {
         console.log({
            ...values,
            startDate: formatISO9075(startDate, { representation: 'date' }),
            startTime: formatISO9075(startTime, { representation: 'time' }),
         });
      },
   });

   return (
      <PageWrapper>
         <PageTitle>Przydziel nowe zadanie</PageTitle>
         <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
         >
            <Grid container spacing={2} justifyContent="center">
               <Grid item xs={10}>
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
               <Grid item xs={10}>
                  <FormControl variant="outlined" fullWidth>
                     <InputLabel id="demo-mutiple-chip-label">
                        Wybierz pracownika
                     </InputLabel>
                     <Select
                        labelId="demo-mutiple-chip-label"
                        label="Wybierz pracownika"
                        value={formik.values.selectedTrainer}
                        onChange={(event) =>
                           formik.setValues({
                              selectedTrainer: event.target.value,
                           })
                        }
                     >
                        <MenuItem value="" disabled>
                           Wybierz pracownika
                        </MenuItem>
                        {employees.map((user) => (
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
                  </FormControl>
               </Grid>
               <Grid item xs={10}>
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
               <Grid item xs={5}>
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
               <Grid item xs={5}>
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
                        minDate={startDate}
                        minDateMessage={`Proszę wskazać datę późniejszą niż ${formatISO9075(
                           startDate,
                        )}`}
                        minutesStep={5}
                     />
                  </div>
               </Grid>
               <Grid item xs={10}>
                  <Button
                     type="submit"
                     variant="outlined"
                     color="primary"
                     fullWidth
                     style={{ marginTop: '5px' }}
                  >
                     Stwórz zadanie
                  </Button>
               </Grid>
            </Grid>
         </form>
      </PageWrapper>
   );
};

export default AddTaskPage;
