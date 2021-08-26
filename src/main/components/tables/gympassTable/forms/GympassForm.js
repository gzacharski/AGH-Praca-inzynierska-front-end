/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
   Grid,
   TextField,
   Button,
   FormControlLabel,
   Switch,
} from '@material-ui/core';
import { useAuth } from 'src/main/auth';
import { useStyles } from './GympassForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
});

export const GympassForm = ({
   documentId = '',
   title = '',
   subheader = '',
   price = {},
   isPremium = false,
   description = {},
   onCloseCallback = () => false,
   readOnly = false,
   onSubmitReduxCallback = () => false,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { authState = {} } = useAuth();
   const { token = '' } = authState;
   const { amount = '55,99', currency = 'zł', period = 'miesiąc' } = price;
   const { synopsis = '', features = [] } = description;

   const formik = useFormik({
      initialValues: {
         documentId,
         title,
         subheader,
         amount,
         currency,
         period,
         isPremium,
         synopsis,
         features,
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
         <Grid container spacing={1}>
            <Grid item xs={9}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="title"
                  label="Tytuł"
                  name="title"
                  type="text"
                  defaultValue={formik.initialValues.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={
                     formik.touched.title && isNotEmpty(formik.errors.title)
                  }
                  helperText={formik.touched.title && formik.errors.title}
               />
            </Grid>
            <Grid item xs={3}>
               <div
                  style={{
                     verticalAlign: 'middle',
                     height: '100%',
                     display: 'flex',
                  }}
               >
                  <FormControlLabel
                     control={<Switch value={formik.values.isPremium} />}
                     label="Karnet premium"
                     s
                  />
               </div>
            </Grid>
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="subheader"
                  label="Podtytuł"
                  name="subheader"
                  multiline
                  disabled={readOnly}
                  rows={3}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subheader}
                  error={
                     formik.touched.subheader &&
                     isNotEmpty(formik.errors.subheader)
                  }
                  helperText={
                     formik.touched.subheader && formik.errors.subheader
                  }
               />
            </Grid>
            <Grid item xs={4}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Cena"
                  name="amount"
                  disabled={readOnly}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  error={
                     formik.touched.amount && isNotEmpty(formik.errors.amount)
                  }
                  helperText={formik.touched.amount && formik.errors.amount}
               />
            </Grid>
            <Grid item xs={4}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="currency"
                  label="Waluta"
                  name="currency"
                  disabled={readOnly}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currency}
                  error={
                     formik.touched.currency &&
                     isNotEmpty(formik.errors.currency)
                  }
                  helperText={formik.touched.currency && formik.errors.currency}
               />
            </Grid>
            <Grid item xs={4}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="period"
                  label="Jednostka"
                  name="period"
                  disabled={readOnly}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.period}
                  error={
                     formik.touched.period && isNotEmpty(formik.errors.period)
                  }
                  helperText={formik.touched.period && formik.errors.period}
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="synopsis"
                  label="Streszczenie"
                  name="synopsis"
                  multiline
                  disabled={readOnly}
                  rows={3}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.synopsis}
                  error={
                     formik.touched.synopsis &&
                     isNotEmpty(formik.errors.synopsis)
                  }
                  helperText={formik.touched.synopsis && formik.errors.synopsis}
               />
            </Grid>
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
