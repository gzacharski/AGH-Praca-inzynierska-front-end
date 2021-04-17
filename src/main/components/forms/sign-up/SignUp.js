/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStyles } from './SignUp.styles';
import { phoneRegExp } from './phoneRegExp';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   name: Yup.string()
      .min(2, 'Podaj minimalnie dwa znaki')
      .max(20, 'Maksymalna ilość 20 znaków')
      .required('Imię jest wymagane'),
   surname: Yup.string()
      .min(2, 'Podaj minimalnie dwa znaki')
      .max(20, 'Maksymalna ilość 20 znaków')
      .required('Nazwisko jest wymagane'),
   email: Yup.string()
      .email('Nieprawidłowy adress email')
      .required('Email jest wymagany'),
   password1: Yup.string()
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .required('Hasło jest wymagane'),
   password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Niezgodność podanych haseł')
      .required('Hasło jest wymagane'),
   phone: Yup.string().matches(
      phoneRegExp,
      'Podano nieprawidłowy format numeru telefonu.',
   ),
});

const SignUp = () => {
   const classes = useStyles();
   const formik = useFormik({
      initialValues: {
         name: '',
         surname: '',
         email: '',
         password1: '',
         password2: '',
         phone: '',
      },
      validationSchema,
      onSubmit: (values) => {
         // eslint-disable-next-line no-alert
         alert(JSON.stringify(values, null, 2));
      },
   });

   return (
      <form
         onSubmit={formik.handleSubmit}
         data-testid="sign-up-form"
         className={classes.form}
      >
         <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
               <TextField
                  autoComplete="cc-given-name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Imię"
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={formik.touched.name && isNotEmpty(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  autoComplete="cc-family-name"
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  name="surname"
                  type="text"
                  label="Nazwisko"
                  placeholder="Nazwisko"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  error={
                     formik.touched.surname && isNotEmpty(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
               />
            </Grid>
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
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  fullWidth
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
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password1"
                  name="password1"
                  type="password"
                  label="Hasło"
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
                  label="Powtórz hasło"
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
            Zarejestruj się
         </Button>
      </form>
   );
};

export default SignUp;
