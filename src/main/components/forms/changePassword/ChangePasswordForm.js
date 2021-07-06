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
import { authServiceURL } from 'src/main/data/urls';
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

export const ChangePasswordForm = (props) => {
   const [editable, toggleEditable] = useState(true);
   const {
      setSuccess,
      setDisplayBackdrop,
      setDisplaySnackBar,
      setResponseMessage,
      setError,
      setRedirection,
   } = props;

   const classes = useStyles();
   const formik = useFormik({
      initialValues: {
         password: '',
         password1: '',
         password2: '',
      },
      validationSchema,
      onSubmit: (values) => {
         setDisplayBackdrop(true);

         const requestData = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            password: values.password1,
            matchingPassword: values.password2,
         };

         axios
            .post(`${authServiceURL}/users`, requestData, {
               validateStatus: (status) =>
                  (status >= 200 && status < 300) || status === 409,
            })
            .then((response) => {
               if (!response.data.success) {
                  const { errors } = response.data;
                  if (errors?.name) formik.setErrors({ name: errors.name });
                  if (errors?.surname)
                     formik.setErrors({ surname: errors.surname });
                  if (errors?.email) formik.setErrors({ email: errors.email });
                  if (errors?.phoneNumber)
                     formik.setErrors({ phone: errors.phoneNumber });
                  if (errors?.password)
                     formik.setErrors({ password1: errors.password });
                  if (errors?.matchingPassword)
                     formik.setErrors({ password2: errors.matchingPassword });
               }

               setSuccess(response.data.success);
               setError(false);
               setResponseMessage(response.data.message);
               if (response.status >= 200 && response.status < 300) {
                  setTimeout(() => {
                     setRedirection(true);
                  }, 3000);
               }
            })
            .catch((error) => {
               setSuccess(false);
               setError(true);
               setResponseMessage(error.response?.data?.message);
            })
            .finally(() => {
               formik.values.password1 = '';
               formik.values.password2 = '';
               setDisplayBackdrop(false);
               setDisplaySnackBar(true);
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
                     <IconButton onClick={() => toggleEditable(!editable)}>
                        <Edit fontSize="large" />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Zapisz zmiany" placement="bottom" arrow>
                     <IconButton type="submit" disabled={editable}>
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
                     id="password1"
                     name="password1"
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
