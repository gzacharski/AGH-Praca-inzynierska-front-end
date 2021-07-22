/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AuthContext } from 'src/main/auth';
import { authServiceURL } from 'src/main/data/urls';
import { reset } from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { useStyles } from './LogInForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   email: Yup.string()
      .email('Nieprawidłowy adress email')
      .required('Email jest wymagany'),
   password: Yup.string().required('Hasło jest wymagane'),
});

export default function LogInForm(props) {
   const {
      setSuccess,
      setCircularProgress,
      setDisplaySnackBar,
      setResponseMessage,
      setError,
      setRedirection,
   } = props;

   const authContext = useContext(AuthContext);

   const classes = useStyles();
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         const { email, password } = values;

         setCircularProgress(true);
         axios
            .post(`${authServiceURL}/login`, { email, password })
            .then((response) => {
               if (response.status === 200) {
                  if (response.headers.token === null)
                     throw new Error('Błąd serwera');

                  const decodedToken = jwtDecode(response.headers.token);
                  const { sub } = decodedToken;
                  let { roles } = decodedToken;
                  if (!roles) roles = [];

                  authContext.setAuthState({
                     token: response.headers.token,
                     expiresAt: new Date().getTime() / 1000 + 60 * 60,
                     userInfo: {
                        userId: sub,
                        name: null,
                        surname: null,
                        roles,
                     },
                  });

                  setSuccess(response.data.success);
                  setError(false);
                  setResponseMessage(response.data.message);
                  setCircularProgress(false);
                  setDisplaySnackBar(false);
                  setTimeout(() => {
                     setRedirection(true);
                     dispatch(reset());
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
               setResponseMessage(error.response?.data?.message);
               setCircularProgress(false);
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
}
