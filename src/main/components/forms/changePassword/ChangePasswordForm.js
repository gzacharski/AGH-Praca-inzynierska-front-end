/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Grid, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { accountServiceURL } from 'src/main/data/urls';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { EditIconButton, SaveIconButton } from 'src/main/components/buttons';
import { useStyles } from './ChangePasswordForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   password: Yup.string()
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .required('Stare hasło jest wymagane'),
   password1: Yup.string()
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .required('Nowe hasło jest wymagane'),
   password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Niezgodność podanych haseł')
      .required('Powtórzenie hasła jest wymagane'),
});

export const ChangePasswordForm = () => {
   const [openDialog, setOpenDialog] = useState(false);
   const [editable, toggleEditable] = useState(true);
   const { enqueueSnackbar } = useSnackbar();

   const classes = useStyles();
   const formik = useFormik({
      initialValues: {
         password: '',
         password1: '',
         password2: '',
      },
      validationSchema,
      onSubmit: (values) => {
         setOpenDialog(false);
         const requestData = {
            oldPassword: values.password,
            newPassword: values.password1,
            matchingNewPassword: values.password2,
         };

         const token = localStorage.getItem('token');
         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
         const { userId } = userInfo;

         const config = {
            headers: {
               'Accept-Language': 'pl',
               Authorization: token,
            },
         };

         axios
            .put(`${accountServiceURL}/password/${userId}`, requestData, config)
            .then((response) => {
               formik.setValues(
                  { password: '', password1: '', password2: '' },
                  false,
               );
               toggleEditable();
               if (response?.data?.message) {
                  const { message } = response.data;
                  enqueueSnackbar(message, {
                     variant: 'success',
                     anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                     },
                  });
               }
            })
            .catch((error) => {
               if (error?.response?.data?.message) {
                  const { message } = error.response.data;
                  enqueueSnackbar(message, {
                     variant: 'error',
                     anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                     },
                  });
               }
               if (error?.response?.data) {
                  const { errors } = error.response.data;
                  if (errors) {
                     formik.setErrors({
                        password: errors?.oldPassword,
                        password1: errors?.newPassword,
                        password2: errors?.matchingNewPassword,
                     });
                  }
               }
               if (error?.response?.status === 400) {
                  formik.setErrors({
                     password: error.response.data.message,
                  });
               }
            });
      },
   });

   return (
      <Paper className={classes.paper}>
         <form
            onSubmit={formik.handleSubmit}
            data-testid="sign-up-form"
            className={classes.form}
            id="changePasswordForm"
            noValidate
         >
            <div className={classes.header}>
               <Typography
                  variant="h5"
                  color="primary"
                  className={classes.title}
               >
                  Zmień hasło
               </Typography>
               <div className={classes.headerButtons}>
                  <EditIconButton
                     callback={() => {
                        toggleEditable(!editable);
                        formik.setErrors({
                           password1: false,
                           password2: false,
                           password: false,
                        });
                     }}
                  />
                  <SaveIconButton
                     callback={() => setOpenDialog(true)}
                     editable={editable}
                  />
                  <SaveChangesDialog
                     form="changePasswordForm"
                     openDialog={openDialog}
                     setOpenDialog={setOpenDialog}
                  />
               </div>
            </div>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     id="password"
                     name="password"
                     type="password"
                     label="Stare hasło"
                     autoComplete="current-password"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password}
                     error={
                        formik.touched.password &&
                        isNotEmpty(formik.errors.password)
                     }
                     helperText={
                        formik.touched.password && formik.errors.password
                     }
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     id="password1"
                     name="password1"
                     type="password"
                     label="Nowe hasło"
                     autoComplete="new-password"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password1}
                     error={
                        formik.touched.password1 &&
                        isNotEmpty(formik.errors.password1)
                     }
                     helperText={
                        formik.touched.password1 && formik.errors.password1
                     }
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     variant="outlined"
                     required
                     fullWidth
                     disabled={editable}
                     id="password2"
                     name="password2"
                     type="password"
                     label="Powtórz nowe hasło"
                     autoComplete="new-password"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password2}
                     error={
                        formik.touched.password2 &&
                        isNotEmpty(formik.errors.password2)
                     }
                     helperText={
                        formik.touched.password2 && formik.errors.password2
                     }
                  />
               </Grid>
            </Grid>
         </form>
      </Paper>
   );
};
