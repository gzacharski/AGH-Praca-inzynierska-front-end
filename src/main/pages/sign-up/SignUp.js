/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { useStyles } from './SignUp.styles';
import "./SignUp.css"

const validate = (values) => {
   const errors = {};

   if (!values.name) {
      errors.name = 'Imię jest wymagane';
   } else if (values.name.length < 2) {
      errors.name = 'Podaj minimalnie dwa znaki';
   } else if (values.name.length > 20) {
      errors.name = 'Maksymalna ilość 20 znaków';
   }

   if (!values.surname) {
      errors.surname = 'Nazwisko jest wymagane';
   } else if (values.surname.length < 2) {
      errors.surname = 'Podaj minimalnie dwa znaki';
   } else if (values.surname.length > 20) {
      errors.surname = 'Maksymalna ilość 20 znaków';
   }

   if (!values.email) {
      errors.email = 'Email jest wymagany';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Nieprawidłowy adress email';
   }

   if(!values.password1){
      errors.password1="Hasło jest wymagane";
   }else if(values.password1!==values.password2){
      errors.password1="Niezgodność podanych haseł";
   }else if(values.password1.length<8){
      errors.password1="Hasło musi zawierać conajmniej 8 znaków."
   }else if(values.password2.length>24){
      errors.password1="Hasło musi zawierać maksymalnie 24 znaki."
   }

   if(!values.password2){
      errors.password2="Pole wymagane";
   }else if(values.password2!==values.password1){
      errors.password2="Niezgodność podanych haseł";
   }

   return errors;
};

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
      validate,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2));
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} data-testid='sign-up-form'>
         <div>
            <label htmlFor="name">Imię</label>
            <input
               id="name"
               name="name"
               type="text"
               placeholder="Imię"
               onChange={formik.handleChange}
               value={formik.values.name}
            />
            {formik.errors.name && <div className="warning">{formik.errors.name}</div>}
         </div>
         <div>
            <label htmlFor="surname">Nazwisko</label>
            <input
               id="surname"
               name="surname"
               type="text"
               placeholder="Nazwisko"
               onChange={formik.handleChange}
               value={formik.values.surname}
            />
            {formik.errors.surname && <div className="warning">{formik.errors.surname}</div>}
         </div>
         <div>
            <label htmlFor="email">Email</label>
            <input
               id="email"
               name="email"
               type="email"
               placeholder="Email"
               onChange={formik.handleChange}
               value={formik.values.email}
            />
            {formik.errors.email && <div className="warning">{formik.errors.email}</div>}
         </div>
         <div>
            <label htmlFor="password1">Hasło</label>
            <input
               id="password1"
               name="password1"
               type="password"
               placeholder="Hasło"
               onChange={formik.handleChange}
               value={formik.values.password1}
            />
            {formik.errors.password1 && <div className="warning">{formik.errors.password1}</div>}
         </div>
         <div>
            <label htmlFor="password2">Powtórz hasło</label>
            <input
               id="password2"
               name="password2"
               type="password"
               placeholder="Powtórz hasło"
               onChange={formik.handleChange}
               value={formik.values.password2}
            />
            {formik.errors.password2 && <div className="warning">{formik.errors.password2}</div>}
         </div>
         <button type="submit">Zarejestruj się</button>
      </form>
   );
};

export default SignUp;
