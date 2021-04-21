/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'src/main/auth';
import { userServiceURL } from 'src/main/data/urls';
import { useStyles } from './LogInForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   email: Yup.string()
      .email('Nieprawidłowy adress email')
      .required('Email jest wymagany'),
   password: Yup.string().required('Hasło jest wymagane'),
});

const LogInForm = (props) => {
   const {
      setSuccess,
      setDisplayCircularProgress,
      setDisplaySnackBar,
      setResponseMessage,
      setError,
      setRedirection,
   } = props;

   const authContext = useContext(AuthContext);

   const classes = useStyles();

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         setDisplayCircularProgress(true);
         const { email, password } = values;

         axios({
            method: 'POST',
            url: `${userServiceURL}/login`,
            data: { email, password },
         })
            .then((response) => {

               if (response.status === 200) {
                  if (response.headers.token === null)
                     throw new Error('Błąd serwera');

                  // TODO: temporarily, need to change from localStorage to HttpOnly cookie
                  localStorage.setItem('token', response.headers.token);
                  authContext.setAuthState({
                     token: response.headers.token,
                     expiresAt: null,
                     userInfo: {},
                  });

                  setSuccess('response.data.success');
                  setError(false);
                  setResponseMessage('response.data.message');
                  setDisplayCircularProgress(false);
                  setDisplaySnackBar(true);
                  setTimeout(() => {
                     setRedirection(true);
                  }, 700);
               } else {
                  const { errors } = response.data;
                  if (errors?.email) formik.setErrors({ email: errors.email });
                  if (errors?.logIn) formik.setErrors({ email: errors.email });
               }

            })
            .catch((error) => {
               setSuccess(false);
               setError(true);
               setResponseMessage(error.message);
               setDisplayCircularProgress(false);
               setDisplaySnackBar(true);
            });
      },
   });
   return (
      <form
         onSubmit={formik.handleSubmit}
         className={classes.form}
         noValidate
         data-testid="log-in-form"
      >
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && isNotEmpty(formik.errors.name)}
            helperText={formik.touched.email && formik.errors.email}
         />
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={
               formik.touched.password && isNotEmpty(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
         />

         {
            // TODO Remember me
            /* 
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
         /> */
         }
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
         >
            Zaloguj
         </Button>
      </form>
   );
};

export default LogInForm;
