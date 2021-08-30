/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'material-ui-image';
import Cropper from 'react-easy-crop';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
   Grid,
   TextField,
   Button,
   Typography,
   Select,
   Input,
   Chip,
   Avatar,
   MenuItem,
} from '@material-ui/core';
import { useAuth } from 'src/main/auth';
import {
   fetchWorkoutList,
   selectStatus,
   selectWorkouts,
} from 'src/main/store/sliceFiles/workoutSlice';
import { STATUS } from 'src/main/store/status';
import getCroppedImg from './cropImage';
import { useStyles } from './EquipmentForm.styles';

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   title: Yup.string().required('Pole jest wymagane'),
   description: Yup.string().required('Pole jest wymagane'),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

export const EquipmentForm = ({
   equipmentId = '',
   title = '',
   image = 'http://localhost',
   description = '',
   onCloseCallback = () => false,
   readOnly = false,
   onSubmitReduxCallback = () => false,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const [imageToUpdate, setImageToUpdate] = useState(null);

   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [rotation, setRotation] = useState(0);
   const [zoom, setZoom] = useState(1);
   const [croppedPixels, setCroppedPixels] = useState(null);
   const [croppedImage, setCroppedImage] = useState(null);
   const [editingState, setEditingState] = useState(false);
   const [selectedWorkouts, setSelectedWorkouts] = useState([]);
   const status = useSelector(selectStatus);
   const workouts = useSelector(selectWorkouts);

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
         equipmentId,
         title,
         description,
      },
      validationSchema,
      onSubmit: (values) => {
         onCloseCallback();
         dispatch(
            onSubmitReduxCallback({
               file: croppedImage,
               equipmentId: values?.equipmentId,
               title: values?.title,
               synopsis: values?.description,
               trainingIds: selectedWorkouts.map(
                  (training) => training.trainingTypeId,
               ),
               token,
            }),
         );
      },
   });

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchWorkoutList({}));
      }
   }, [status, dispatch]);

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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                     <Typography variant="subtitle1" color="primary">
                        Wybierz treningi, w których jest wykorzystywany sprzęt
                     </Typography>
                     <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        fullWidth
                        disabled={readOnly}
                        value={selectedWorkouts}
                        onChange={(event) =>
                           setSelectedWorkouts(event.target.value)
                        }
                        className={classes.select}
                        input={<Input />}
                        renderValue={(selected) => (
                           <div className={classes.chips}>
                              {selected.map((value) => (
                                 <Chip
                                    key={value?.trainingTypeId}
                                    avatar={
                                       <Avatar
                                          src={value?.image}
                                       >{`${value?.name}`}</Avatar>
                                    }
                                    label={`${value?.name}`}
                                    className={classes.chip}
                                 />
                              ))}
                           </div>
                        )}
                        MenuProps={MenuProps}
                     >
                        <MenuItem value="" disabled>
                           Wybierz treningi
                        </MenuItem>
                        {workouts.map((workout) => (
                           <MenuItem
                              key={workout?.trainingTypeId}
                              value={workout}
                           >
                              <div className={classes.menuItem}>
                                 <Avatar
                                    className={classes.avatar}
                                    src={workout?.image}
                                 >{`${workout?.name?.[0]}`}</Avatar>
                                 <Typography>{`${workout?.name}`}</Typography>
                              </div>
                           </MenuItem>
                        ))}
                     </Select>
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
                        rows={2}
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
