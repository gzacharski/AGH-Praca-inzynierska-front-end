import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Grid, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   fetchUserInfo,
   selectUserInfo,
   setUserInfo,
   selectStatus,
   clearMessage,
   selectMessage,
} from 'src/main/store/sliceFiles/accountSlice';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { STATUS } from 'src/main/store';
import { SaveIconButton, EditIconButton } from 'src/main/components/buttons';
import { useStyles } from './ChangeUserInfoForm.styles';
import { phoneRegExp } from '../sign-up/phoneRegExp';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   name: Yup.string()
      .min(2, 'Podaj minimalnie dwa znaki')
      .max(60, 'Maksymalna ilość 60 znaków')
      .required('Imię jest wymagane'),
   surname: Yup.string()
      .min(2, 'Podaj minimalnie dwa znaki')
      .max(60, 'Maksymalna ilość 60 znaków')
      .required('Nazwisko jest wymagane'),
   email: Yup.string()
      .email('Nieprawidłowy adress email')
      .required('Email jest wymagany'),
   phone: Yup.string().matches(
      phoneRegExp,
      'Podano nieprawidłowy format numeru telefonu.',
   ),
});

export const ChangeUserInfoForm = () => {
   const [editable, toggleEditable] = useState(true);
   const [openDialog, setOpenDialog] = useState(false);
   const dispatch = useDispatch();
   const userInfo = useSelector(selectUserInfo);
   const userInfoStatus = useSelector(selectStatus);
   const message = useSelector(selectMessage);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (userInfoStatus === STATUS.IDLE) {
         dispatch(fetchUserInfo());
      }
   }, [userInfoStatus, dispatch]);

   const classes = useStyles();
   const formik = useFormik({
      initialValues: {
         name: userInfo.name,
         surname: userInfo.surname,
         email: userInfo.email,
         phone: userInfo.phone,
      },
      validationSchema,
      onSubmit: (values) => {
         setOpenDialog(false);
         toggleEditable(!editable);
         const { name, surname, email, phone } = values;

         dispatch(setUserInfo({ name, surname, email, phone }))
            .unwrap()
            .catch((error) => {
               const { status } = error;
               if (status === 409) {
                  formik.setErrors({ email: error.message });
               } else if (status === 404) {
                  const { errors } = error;
                  if (errors?.name) formik.setErrors({ name: errors.name });
                  if (errors?.surname)
                     formik.setErrors({ surname: errors.surname });
                  if (errors?.email) formik.setErrors({ email: errors.email });
                  if (errors?.phoneNumber)
                     formik.setErrors({ phone: errors.phoneNumber });
               }
            });
      },
   });

   if (formik.values.name === null) {
      formik.values.name = userInfo.name;
   }

   if (formik.values.surname === null) {
      formik.values.surname = userInfo.surname;
   }

   if (formik.values.email === null) {
      formik.values.email = userInfo.email;
   }

   if (formik.values.phone === null) {
      formik.values.phone = userInfo.phone;
   }

   if (message) {
      const variant = userInfoStatus === STATUS.SUCCEEDED ? 'success' : 'error';
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   return (
      <Paper className={classes.paper}>
         <form
            onSubmit={formik.handleSubmit}
            data-testid="sign-up-form"
            className={classes.form}
            noValidate
            id="changeUserDataForm"
         >
            <div className={classes.header}>
               <Typography
                  variant="h5"
                  color="primary"
                  className={classes.title}
               >
                  Dane osobowe
               </Typography>
               <div className={classes.headerButtons}>
                  <EditIconButton callback={() => toggleEditable(!editable)} />
                  <SaveIconButton
                     editable={editable}
                     callback={() => setOpenDialog(true)}
                  />
                  <SaveChangesDialog
                     form="changeUserDataForm"
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                  />
               </div>
            </div>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     autoComplete="cc-given-name"
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     label="Imię"
                     id="name"
                     name="name"
                     type="text"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.name}
                     error={
                        formik.touched.name && isNotEmpty(formik.errors.name)
                     }
                     helperText={formik.touched.name && formik.errors.name}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     autoComplete="cc-family-name"
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     id="surname"
                     name="surname"
                     type="text"
                     label="Nazwisko"
                     placeholder="Nazwisko"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.surname}
                     error={
                        formik.touched.surname &&
                        isNotEmpty(formik.errors.surname)
                     }
                     helperText={
                        formik.touched.surname && formik.errors.surname
                     }
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     id="email"
                     name="email"
                     type="email"
                     label="Email"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                     error={
                        formik.touched.email && isNotEmpty(formik.errors.email)
                     }
                     helperText={formik.touched.email && formik.errors.email}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     variant="outlined"
                     fullWidth
                     disabled={editable}
                     id="phone"
                     name="phone"
                     type="tel"
                     label="Telefon"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.phone}
                     error={
                        formik.touched.phone && isNotEmpty(formik.errors.phone)
                     }
                     helperText={formik.touched.phone && formik.errors.phone}
                  />
               </Grid>
            </Grid>
         </form>
      </Paper>
   );
};
