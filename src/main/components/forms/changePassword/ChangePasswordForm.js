/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
   IconButton,
   Paper,
   Grid,
   TextField,
   Tooltip,
   Typography,
} from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { accountServiceURL } from 'src/main/data/urls';
import { useStyles } from './ChangePasswordForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   password: Yup.string().required('Stare hasło jest wymagane'),
   password1: Yup.string()
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .required('Nowe hasło jest wymagane'),
   password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Niezgodność podanych haseł')
      .required('Powtórzenie hasła jest wymagane'),
});

export const ChangePasswordForm = () => {
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

         console.log(requestData);
         axios
            .put(
               `${accountServiceURL}/changePassword/${userId}`,
               requestData,
               config,
            )
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
                  <Tooltip title="Edytuj" placement="bottom" arrow>
                     <IconButton
                        className={classes.icon}
                        onClick={() => {
                           toggleEditable(!editable);
                           formik.setErrors({
                              password1: false,
                              password2: false,
                              password: false,
                           });
                        }}
                     >
                        <Edit fontSize="large" />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Zapisz zmiany" placement="bottom" arrow>
                     <IconButton
                        type="submit"
                        disabled={editable}
                        className={classes.icon}
                     >
                        <Save fontSize="large" />
                     </IconButton>
                  </Tooltip>
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
