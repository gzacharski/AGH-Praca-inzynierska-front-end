/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
   Dialog,
   Typography,
   Grid,
   TextField,
   makeStyles,
   FormControlLabel,
   Switch,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/users/clientSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      padding: spacing(2),
   },
}));

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
   synopsis: Yup.string().required('Pole jest wymagane'),
});

const UserInfoForm = ({ readOnly, user = {} }) => {
   const classes = useStyles();
   const {
      name = '',
      surname = '',
      email = '',
      phoneNumber = '',
      userId = '',
      enabled = false,
      accountNonExpired = true,
      credentialsNonExpired = true,
      accountNonLocked = true,
      roles = ['USER'],
      avatar = '',
   } = user;

   const formik = useFormik({
      initialValues: {
         name,
         surname,
         email,
         phoneNumber,
         userId,
         enabled,
         accountNonExpired,
         credentialsNonExpired,
         accountNonLocked,
         roles,
         avatar,
      },
      validationSchema,
      onSubmit: (values) => {},
   });

   const handleSwitchChange = (event) => {
      formik.setValues((values) => ({
         ...values,
         isPremium: event.target.checked,
      }));
   };

   return (
      <div className={classes.root}>
         <Grid container spacing={2}>
            <Grid item xs={8}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="userId"
                  label="ID użytkownika"
                  name="userId"
                  type="text"
                  defaultValue={formik.initialValues.userId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userId}
                  error={
                     formik.touched.userId && isNotEmpty(formik.errors.userId)
                  }
                  helperText={formik.touched.userId && formik.errors.userId}
               />
            </Grid>
            <Grid item xs={4}>
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
                           checked={formik.values.enabled}
                           onChange={handleSwitchChange}
                        />
                     }
                     label="Konto aktywowane?"
                  />
               </div>
            </Grid>
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="name"
                  label="Imię"
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
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  type="text"
                  defaultValue={formik.initialValues.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  error={
                     formik.touched.surname && isNotEmpty(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="phoneNumber"
                  label="Numer"
                  name="phoneNumber"
                  type="text"
                  defaultValue={formik.initialValues.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  error={
                     formik.touched.phoneNumber &&
                     isNotEmpty(formik.errors.phoneNumber)
                  }
                  helperText={
                     formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={readOnly}
                  id="email"
                  label="Email"
                  name="email"
                  type="text"
                  defaultValue={formik.initialValues.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={
                     formik.touched.email && isNotEmpty(formik.errors.email)
                  }
                  helperText={formik.touched.email && formik.errors.email}
               />
            </Grid>
            <Grid item xs={4}>
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
                           checked={!formik.values.accountNonExpired}
                           onChange={handleSwitchChange}
                        />
                     }
                     label="Konto wygasło?"
                  />
               </div>
            </Grid>
            <Grid item xs={4}>
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
                           checked={!formik.values.accountNonLocked}
                           onChange={handleSwitchChange}
                        />
                     }
                     label="Konto zablokowane?"
                  />
               </div>
            </Grid>
            <Grid item xs={4}>
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
                           checked={!formik.values.credentialsNonExpired}
                           onChange={handleSwitchChange}
                        />
                     }
                     label="Hasło wygasło?"
                  />
               </div>
            </Grid>
         </Grid>
      </div>
   );
};

export const InfoTrainingTypeDialog = () => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { INFO, ADD } = DIALOG_MODE;
   const { mode = ADD, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, entityId));

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="sm">
         <UserInfoForm readOnly user={selectedRow} />
      </Dialog>
   );
};
