/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import Image from 'material-ui-image';
import Cropper from 'react-easy-crop';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { parse, format } from 'date-fns';
import { Grid, TextField, Button } from '@material-ui/core';
import { useAuth } from 'src/main/auth';
import getCroppedImg from './cropImage';
import { useStyles } from './TrainingTypeForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
   description: Yup.string().required('Pole jest wymagane'),
});

export const TrainingTypeForm = ({
   trainingTypeId = '',
   title = '',
   image = 'http://localhost',
   description = '',
   duration = '0:30:00',
   onCloseCallback = () => false,
   readOnly = false,
   onSubmitReduxCallback = () => false,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const [selectedDuration, handleDurationChange] = useState(
      parse(duration, 'HH:mm:ss', 0),
   );
   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const [imageToUpdate, setImageToUpdate] = useState(null);

   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [rotation, setRotation] = useState(0);
   const [zoom, setZoom] = useState(1);
   const [croppedPixels, setCroppedPixels] = useState(null);
   const [croppedImage, setCroppedImage] = useState(null);
   const [editingState, setEditingState] = useState(false);

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedPixels(croppedAreaPixels);
   }, []);

   const showCroppedImage = useCallback(async () => {
      try {
         const croppedImageTmp = await getCroppedImg(
            imageToUpdate,
            croppedPixels,
            rotation,
         );
         setCroppedImage(croppedImageTmp);
      } catch (e) {
         // ignore on error
      }
   }, [croppedPixels, rotation]);

   const formik = useFormik({
      initialValues: {
         trainingTypeId,
         title,
         description,
      },
      validationSchema,
      onSubmit: (values) => {
         onCloseCallback();
         dispatch(
            onSubmitReduxCallback({
               file: croppedImage,
               trainingTypeId: values?.trainingTypeId,
               name: values?.title,
               description: values?.description,
               duration: format(selectedDuration, 'HH:mm:ss.SSS'),
               token,
            }),
         );
      },
   });

   const handleFileChange = (event) => {
      setImageToUpdate(URL.createObjectURL(event.target.files[0]));
      setEditingState(true);
   };

   return (
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
         <Grid container spacing={2}>
            <Grid item xs={12} md={6} justifyContent="center">
               <Grid container>
                  <Grid xs={12}>
                     {editingState ? (
                        <div className={classes.cropContainer}>
                           <Cropper
                              image={imageToUpdate || image}
                              crop={crop}
                              rotation={rotation}
                              zoom={zoom}
                              aspect={16 / 9}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                              onRotationChange={setRotation}
                              onZoomChange={setZoom}
                           />
                        </div>
                     ) : (
                        <Image
                           src={croppedImage || image}
                           alt={title}
                           aspectRatio={16 / 9}
                        />
                     )}
                  </Grid>
                  {!readOnly && (
                     <>
                        <Grid xs={6}>
                           <input
                              accept="image/jpeg, image/png"
                              className={classes.input}
                              id="icon-button-file"
                              type="file"
                              onChange={handleFileChange}
                           />
                           <label htmlFor="icon-button-file">
                              <Button
                                 component="span"
                                 variant="outlined"
                                 color="primary"
                                 fullWidth
                                 style={{ marginTop: '8px' }}
                              >
                                 Wybierz zdjęcie
                              </Button>
                           </label>
                        </Grid>
                        <Grid xs={6}>
                           {editingState ? (
                              <Button
                                 variant="outlined"
                                 color="primary"
                                 fullWidth
                                 style={{ marginTop: '8px' }}
                                 onClick={() => {
                                    setEditingState(false);
                                    showCroppedImage();
                                 }}
                              >
                                 Przytnij
                              </Button>
                           ) : (
                              <Button
                                 variant="outlined"
                                 color="primary"
                                 fullWidth
                                 style={{ marginTop: '8px' }}
                                 onClick={() => setEditingState(true)}
                                 disabled={imageToUpdate === null}
                              >
                                 Edytuj
                              </Button>
                           )}
                        </Grid>
                     </>
                  )}
               </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
               <Grid container justifyContent="space-between">
                  <Grid item xs={12} sm={6}>
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
                           formik.touched.title &&
                           isNotEmpty(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <KeyboardTimePicker
                        variant="inline"
                        label="Czas trwania"
                        views={['hours', 'minutes']}
                        minutesStep={5}
                        disabled={readOnly}
                        openTo="minutes"
                        format="HH:mm:ss"
                        ampm={false}
                        value={selectedDuration}
                        inputVariant="outlined"
                        margin="normal"
                        fullWidth
                        styles={{ height: '100%' }}
                        onChange={handleDurationChange}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Opis"
                        name="description"
                        multiline
                        disabled={readOnly}
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
                           formik.touched.description &&
                           formik.errors.description
                        }
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
                           disabled={editingState}
                        >
                           Zapisz zmiany
                        </Button>
                     </Grid>
                  )}
               </Grid>
            </Grid>
         </Grid>
      </form>
   );
};
