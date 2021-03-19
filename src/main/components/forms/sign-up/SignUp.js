/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStyles } from './SignUp.styles';
import './SignUp.css';
import TextField from '@material-ui/core/TextField';

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
      .min(8, 'Hasło musi zawierać conajmniej 8 znaków.')
      .max(24, 'Hasło musi zawierać maksymalnie 24 znaki.')
      .when('password1', {
         is: (password1) => password1 && password1 > 0,
         then: Yup.string().oneOf(
            [Yup.ref('password1')],
            'Niezgodność podanych haseł',
         ),
      })
      .required('Hasło jest wymagane'),
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
      },
      validationSchema,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2));
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} data-testid="sign-up-form">
         <div>
            <TextField
               label="Imię"
               id="name"
               name="name"
               type="text"
               // placeholder="Imię"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.name}
               error={formik.touched.name && formik.errors.name}
               helperText={formik.errors.name}
            />
            {/* {formik.touched.name && formik.errors.name && (
               <div className="warning">{formik.errors.name}</div>
            )} */}
            {/* <label htmlFor="name">Imię</label>
            <input
               id="name"
               name="name"
               type="text"
               placeholder="Imię"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
               <div className="warning">{formik.errors.name}</div>
            )} */}
         </div>
         <div>
            <label htmlFor="surname">Nazwisko</label>
            <input
               id="surname"
               name="surname"
               type="text"
               placeholder="Nazwisko"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.surname}
            />
            {formik.touched.surname && formik.errors.surname && (
               <div className="warning">{formik.errors.surname}</div>
            )}
         </div>
         <div>
            <label htmlFor="email">Email</label>
            <input
               id="email"
               name="email"
               type="email"
               placeholder="Email"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
               <div className="warning">{formik.errors.email}</div>
            )}
         </div>
         <div>
            <label htmlFor="password1">Hasło</label>
            <input
               id="password1"
               name="password1"
               type="password"
               placeholder="Hasło"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.password1}
            />
            {formik.touched.password1 && formik.errors.password1 && (
               <div className="warning">{formik.errors.password1}</div>
            )}
         </div>
         <div>
            <label htmlFor="password2">Powtórz hasło</label>
            <input
               id="password2"
               name="password2"
               type="password"
               placeholder="Powtórz hasło"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.password2}
            />
            {formik.touched.password2 && formik.errors.password2 && (
               <div className="warning">{formik.errors.password2}</div>
            )}
         </div>
         <button type="submit">Zarejestruj się</button>
      </form>
   );
};

export default SignUp;
