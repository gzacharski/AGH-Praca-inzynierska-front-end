/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Button } from '@material-ui/core';
import { useAuth } from 'src/main/auth';
import { useStyles } from './LocationForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   name: Yup.string().required('Pole jest wymagane'),
});

export const LocationForm = ({
   locationId = '',
   name = '',
   description = '',
   onCloseCallback = () => false,
   readOnly = false,
   onSubmitReduxCallback = () => false,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const formik = useFormik({
      initialValues: {
         locationId,
         name,
         description,
      },
      validationSchema,
      onSubmit: (values) => {
         onCloseCallback();
         dispatch(
            onSubmitReduxCallback({
               locationId: values?.locationId || '',
               name: values?.name || '',
               description: values?.description || '',
               token,
            }),
         );
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
         <Grid container justifyContent="space-between">
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="name"
                  label="Nazwa"
                  name="name"
                  type="text"
                  defaultValue={formik.initialValues.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={formik.touched.name && isNotEmpty(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
            </Grid>
            {/* <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Opis"
                  name="description"
                  multiline
                  // disabled={readOnly}
                  disabled
                  rows={6}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  error={
                     formik.touched.description &&
                     isNotEmpty(formik.errors.description)
                  }
                  helperText={
                     formik.touched.description && formik.errors.description
                  }
               />
            </Grid> */}
            {!readOnly && (
               <Grid item xs={12}>
                  <Button
                     type="submit"
                     variant="outlined"
                     color="primary"
                     fullWidth
                     style={{ marginTop: '5px' }}
                  >
                     Zapisz zmiany
                  </Button>
               </Grid>
            )}
         </Grid>
      </form>
   );
};
