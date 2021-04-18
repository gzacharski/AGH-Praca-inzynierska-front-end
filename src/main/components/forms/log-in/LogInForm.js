/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
   const classes = useStyles();

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         const { email, password } = values;

         axios
            .post(`${userServiceURL}/login`, { email, password })
            .then((response) => {
               if (response.status !== 200) {
                  const { errors } = response.data;
                  if (errors?.email) {
                     //  formik.setErrors({ email: errors.email });
                     //  formik.setTouched({ email: true });
                     formik.setFieldError(email, errors.email);
                  }
                  if (errors?.logIn) formik.setErrors({ email: errors.email });
               } else if (
                  response.status === 200 &&
                  response.headers.token != null
               ) {
                  console.log(response);
               }
            })
            .catch((error) => {
               console.log(error);
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
            autoFocus
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
