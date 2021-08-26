/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Image from 'material-ui-image';
import Cropper from 'react-easy-crop';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { parse, format } from 'date-fns';
import {
   Avatar,
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
   Grid,
   makeStyles,
   TextField,
   Select,
   FormControl,
   InputLabel,
   MenuItem,
   Button,
} from '@material-ui/core';
import {
   selectById,
   updateTrainingType,
} from 'src/main/store/sliceFiles/workoutSlice';
import {
   selectAll as selectAllTrainers,
   fetchTrainersList,
   selectStatus,
} from 'src/main/store/sliceFiles/users/trainersSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import getCroppedImg from './cropImage';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   avatar: {
      width: spacing(3),
      height: spacing(3),
      marginRight: spacing(1),
   },
   menuItem: {
      display: 'flex',
   },
   input: {
      display: 'none',
   },
   cropContainer: {
      position: 'relative',
      height: '313px',
   },
   image: {
      height: '313px',
   },
}));

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   trainingTypeId: Yup.string().required('Pole jest wymagane'),
   title: Yup.string().required(),
   description: Yup.string().required('Pole jest wymagane'),
});

const UpdateForm = ({
   trainingTypeId,
   title,
   image,
   description,
   trainer,
   duration,
   onCloseCallback,
}) => {
   const classes = useStyles();
   const trainers = useSelector(selectAllTrainers);
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
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
         trainerId: trainer.userId,
      },
      validationSchema,
      onSubmit: (values) => {
         onCloseCallback();
         console.log({
            file: croppedImage,
            trainingTypeId: values?.trainingTypeId,
            name: values?.title,
            description: values?.description,
            trainerId: values?.trainerId,
            duration: format(selectedDuration, 'HH:mm:ss.SSS'),
            token,
         });
         dispatch(
            updateTrainingType({
               file: croppedImage,
               trainingTypeId: values?.trainingTypeId,
               name: values?.title,
               description: values?.description,
               trainerId: values?.trainerId,
               duration: format(selectedDuration, 'HH:mm:ss.SSS'),
               token,
            }),
         );
      },
   });

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchTrainersList({ token }));
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
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Opis"
                        name="description"
                        multiline
                        rows={4}
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
                  <Grid item xs={12} sm={6}>
                     <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="select-trainer-label">
                           Wybierz trenera
                        </InputLabel>
                        <Select
                           label="Wybierz trenera"
                           variant="outlined"
                           required
                           fullWidth
                           id="trainerId"
                           labelId="select-trainer-label"
                           name="trainerId"
                           value={formik.values.trainerId}
                           onChange={formik.handleChange}
                        >
                           <MenuItem
                              value={trainer?.userId}
                           >{`${trainer?.name} ${trainer?.surname}`}</MenuItem>
                           {trainers.map((user) => (
                              <MenuItem key={user?.userId} value={user?.userId}>
                                 <div className={classes.menuItem}>
                                    <Avatar
                                       className={classes.avatar}
                                       src={user?.avatar}
                                    >{`${user?.name?.[0]}${user?.surname?.[0]}`}</Avatar>
                                    <Typography>{`${user?.name} ${user?.surname}`}</Typography>
                                 </div>
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                     <KeyboardTimePicker
                        variant="inline"
                        label="Czas trwania"
                        views={['hours', 'minutes']}
                        minutesStep={5}
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
               </Grid>
            </Grid>
         </Grid>
      </form>
   );
};

export const EditTrainingTypeDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const {
      trainingTypeId = '',
      name = '',
      image = '',
      description = '',
      trainer = {},
      duration = '',
   } = selectedRow;

   const shouldOpen = mode === EDIT && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               {name} - edytuj typ treningu
            </Typography>
         </DialogTitle>
         <DialogContent>
            <UpdateForm
               title={name}
               description={description}
               image={image}
               duration={duration}
               trainer={trainer}
               trainingTypeId={trainingTypeId}
               onCloseCallback={closeDialog}
            />
         </DialogContent>
      </Dialog>
   );
};
