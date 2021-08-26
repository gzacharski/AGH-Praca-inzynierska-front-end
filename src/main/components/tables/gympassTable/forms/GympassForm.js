/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormik } from 'formik';
import ChipInput from 'material-ui-chip-input';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import {
   Grid,
   TextField,
   Button,
   FormControlLabel,
   Switch,
   FormControl,
} from '@material-ui/core';
import { useAuth } from 'src/main/auth';
import { useStyles } from './GympassForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
   synopsis: Yup.string().required('Pole jest wymagane'),
   features: Yup.array().min(1, 'Wymanaga przynajmniej jedna cecha'),
});

const CustomNumberFormat = ({ inputRef, onChange, name, ...other }) => (
   <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
         onChange({
            target: {
               name,
               value: values.value,
            },
         });
      }}
      decimalScale={2}
      allowNegative={false}
      thousandSeparator=" "
      decimalSeparator=","
      isNumericString
   />
);

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
   const { amount = '0,00', currency = 'zł', period = 'miesiąc' } = price;
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
               documentId: values.documentId,
               title: values.title,
               subheader: values.subheader,
               amount: Number.parseFloat(values.amount),
               currency: values.currency,
               period: values.period,
               isPremium: values.isPremium,
               synopsis: values.synopsis,
               features: values.features,
               token,
            }),
         );
      },
   });

   const handleSwitchChange = (event) => {
      formik.setValues((values) => ({
         ...values,
         isPremium: event.target.checked,
      }));
   };

   const handleAddChip = (chip) => {
      formik.setValues((values) => ({
         ...values,
         features: [...values.features, chip],
      }));
   };

   const handleDeleteChip = (chip, index) => {
      formik.setValues((values) => {
         const updatedFeatures = values.features;
         updatedFeatures.splice(index, 1);
         return { ...values, features: updatedFeatures };
      });
   };

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
                     control={
                        <Switch
                           disabled={readOnly}
                           checked={formik.values.isPremium}
                           onChange={handleSwitchChange}
                        />
                     }
                     label="Karnet premium"
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  error={
                     formik.touched.amount && isNotEmpty(formik.errors.amount)
                  }
                  helperText={formik.touched.amount && formik.errors.amount}
                  InputProps={{
                     inputComponent: CustomNumberFormat,
                  }}
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
            <Grid item xs={12}>
               <FormControl variant="outlined" fullWidth margin="normal">
                  <ChipInput
                     required
                     variant="outlined"
                     margin="normal"
                     label="Cechy"
                     id="features"
                     value={formik.values.features}
                     disabled={readOnly}
                     fullWidth
                     placeholder="Zacznij pisać i wciśnij enter by dodać"
                     onAdd={(chip) => handleAddChip(chip)}
                     onDelete={(chip, index) => handleDeleteChip(chip, index)}
                     error={
                        formik.touched.features &&
                        isNotEmpty(formik.errors.features)
                     }
                     helperText={
                        formik.touched.features && formik.errors.features
                     }
                  />
               </FormControl>
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
