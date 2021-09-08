/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'material-ui-image';
import Cropper from 'react-easy-crop';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {
   LinearProgress,
   Grid,
   TextField,
   Button,
   makeStyles,
   Paper,
} from '@material-ui/core';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import {
   selectStatus,
   fetchTrainerProfile,
   selectById,
   createTrainerProfile,
   selectMessage,
   clearMessage,
   updateTrainerProfile,
} from 'src/main/store/sliceFiles/trainerListSlice';
import { STATUS } from 'src/main/store/status';
import { useAuth } from 'src/main/auth';
import getCroppedImg from 'src/main/components/tables/trainingTypeTable/dialogs/forms/cropImage';

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
   imageList: {
      justifyContent: 'center',
   },
   image: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
   },
}));

const isNotEmpty = (text) => text && text.length !== 0;

const validationSchema = Yup.object({
   synopsis: Yup.string().required('Pole jest wymagane'),
   description: Yup.string().required('Pole jest wymagane'),
});

const TrainerForm = ({
   userId = '',
   synopsis = '',
   image = '',
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
         userId,
         synopsis,
         description,
      },
      validationSchema,
      onSubmit: (values) => {
         onCloseCallback();
         dispatch(
            onSubmitReduxCallback({
               file: croppedImage,
               userId: values?.userId,
               synopsis: values?.synopsis,
               full: values?.description,
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
      <Paper>
         <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
         >
            <Grid container spacing={2} justifyContent="center">
               <Grid item xs={7}>
                  <Grid container justifyContent="center">
                     <Grid xs={12}>
                        {editingState ? (
                           <div className={classes.cropContainer}>
                              <Cropper
                                 image={imageToUpdate || image}
                                 crop={crop}
                                 rotation={rotation}
                                 zoom={zoom}
                                 aspect={1}
                                 onCropChange={setCrop}
                                 onCropComplete={onCropComplete}
                                 onRotationChange={setRotation}
                                 onZoomChange={setZoom}
                              />
                           </div>
                        ) : (
                           (croppedImage || image) && (
                              <Image
                                 src={croppedImage || image}
                                 alt={synopsis}
                                 aspectRatio={1}
                              />
                           )
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
               <Grid item xs={7}>
                  <Grid container justifyContent="space-between">
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           disabled={readOnly}
                           id="synopsis"
                           label="Cytat"
                           name="synopsis"
                           type="text"
                           defaultValue={formik.initialValues.synopsis}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.synopsis}
                           error={
                              formik.touched.synopsis &&
                              isNotEmpty(formik.errors.synopsis)
                           }
                           helperText={
                              formik.touched.synopsis && formik.errors.synopsis
                           }
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           id="description"
                           label="Opis/Biografia"
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
      </Paper>
   );
};

const TrainerPage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const { authState = {} } = useAuth();
   const { token = '', userInfo = {} } = authState;
   const { userId = '' } = userInfo;
   const trainer = useSelector((state) => selectById(state, userId));
   const message = useSelector(selectMessage);
   const { enqueueSnackbar } = useSnackbar();

   const { images = [], description } = trainer || {};

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchTrainerProfile({ token, userId }));
      }
   }, [status, dispatch]);

   if (message) {
      const variant = status === STATUS.SUCCEEDED ? 'success' : 'error';
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   const submitCallback = trainer ? updateTrainerProfile : createTrainerProfile;

   return (
      <PageWrapper>
         <PublicPageTitle
            header="Mój profil publiczny"
            subheader="Wybierz odpowiednie zdjęcie i opis dla wyświetlenia na stronie publicznej"
         />
         {status === STATUS.LOADING && <LinearProgress />}
         {[STATUS.SUCCEEDED, STATUS.FAILED].includes(status) && (
            <TrainerForm
               description={description?.full || ''}
               image={images?.[0] || ''}
               synopsis={description?.synopsis || ''}
               userId={userId}
               onSubmitReduxCallback={submitCallback}
            />
         )}
      </PageWrapper>
   );
};

export default TrainerPage;
