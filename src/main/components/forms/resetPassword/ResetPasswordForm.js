import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField } from '@material-ui/core';
import { authServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { useStyles } from './ResetPasswordForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   email: Yup.string()
      .email('Nieprawidłowy adress email')
      .required('Email jest wymagany'),
});

const ConfirmResetPasswordForm = (props) => {
   const { setMessage, setOnRequest, setStatus } = props;

   const classes = useStyles();

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema,
      onSubmit: (values) => {
         setOnRequest(true);
         axios
            .post(
               `${authServiceURL}/resetPassword`,
               {
                  email: values.email,
               },
               {
                  headers: {
                     'Accept-Language': 'pl',
                  },
               },
            )
            .then((response) => {
               setStatus(response.status);
               setMessage(response.data.message);
            })
            .catch((error) => {
               if (error.response === undefined) {
                  setStatus(500);
                  setMessage(NETWORK_ERROR);
               } else {
                  setStatus(error.response?.status);
                  setMessage(error.response?.data?.message);
               }
            })
            .finally(() => {
               // timeout for tests
               setTimeout(() => setOnRequest(false), 700);
            });
      },
   });

   return (
      <form
         onSubmit={formik.handleSubmit}
         data-testid="reset-password-form"
         className={classes.form}
         noValidate
      >
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  required
                  fullWidth
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
         </Grid>
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
         >
            Wyślij link do zmiany hasła
         </Button>
      </form>
   );
};

export default ConfirmResetPasswordForm;
