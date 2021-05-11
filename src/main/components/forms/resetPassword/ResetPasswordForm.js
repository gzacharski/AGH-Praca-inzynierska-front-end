import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField } from '@material-ui/core';
import { withRouter, useLocation } from 'react-router-dom';
import { userServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { useStyles } from './ResetPasswordForm.styles';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   password1: Yup.string()
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .required('Hasło jest wymagane'),
   password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Niezgodność podanych haseł')
      .required('Hasło jest wymagane'),
});

const ResetPasswordForm = (props) => {
   const { setMessage, setOnRequest, setStatus } = props;

   const params = useQuery();
   const token = params.get('token');

   const classes = useStyles();

   const formik = useFormik({
      initialValues: {
         password1: '',
         password2: '',
      },
      validationSchema,
      onSubmit: (values) => {
         setOnRequest(true);
         axios
            .post(
               `${userServiceURL}/confirmNewPassword`,
               {
                  password: values.password1,
                  matchingPassword: values.password2,
               },
               {
                  headers: {
                     'Accept-Language': 'pl',
                  },
                  params: {
                     token,
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
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
         >
            Zresetuj hasło
         </Button>
      </form>
   );
};

export default withRouter(ResetPasswordForm);
