/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   Paper,
   Typography,
   Tooltip,
   IconButton,
   Grid,
} from '@material-ui/core';
import { PhotoCamera, CloudUpload, Delete } from '@material-ui/icons';
import { Skeleton as MuiSkeleton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { Skeleton } from 'src/main/components/utils';
import {
   setAvatar,
   selectAvatar,
   selectMessage,
   clearMessage,
   removeAvatar,
   selectStatus,
} from 'src/main/store/sliceFiles/avatarSlice';
import { selectUserInfo } from 'src/main/store/sliceFiles/accountSlice';
import { AvatarIcon } from 'src/main/components/icons';
import { STATUS } from 'src/main/store';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { useStyles } from './ChangeAvatarForm.styles';

const UserInfo = ({ render, name, surname, phone, email }) => {
   if (render) {
      return (
         <>
            <Typography variant="subtitle1" component="h2">
               {name} {surname}
            </Typography>
            <Typography variant="subtitle2">{phone}</Typography>
            <Typography variant="subtitle2">{email}</Typography>
         </>
      );
   }

   return (
      <>
         <MuiSkeleton width="100%" />
         <MuiSkeleton width="100%" />
         <MuiSkeleton width="100%" />
      </>
   );
};

const UploadImageButton = ({ file, classes, render, setOpenDialog }) => (
   <Skeleton render={render} classes={{ margin: 0, display: 'inline-block' }}>
      <Tooltip title="Zapisz zmiany" placement="bottom" arrow>
         <div>
            <IconButton
               onClick={() => setOpenDialog(true)}
               disabled={Boolean(!file)}
               className={classes.icon}
               aria-label="upload picture"
            >
               <CloudUpload fontSize="large" />
            </IconButton>
         </div>
      </Tooltip>
   </Skeleton>
);

const ChooseImageButton = ({ render, classes, handleFileChange, file }) => (
   <Skeleton render={render} classes={{ margin: 0, display: 'inline-block' }}>
      <>
         <input
            accept="image/jpeg, image/png"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleFileChange}
         />
         <label htmlFor="icon-button-file">
            <Tooltip title="Wybierz zdjęcie z dysku" arrow placement="bottom">
               <div>
                  <IconButton
                     className={classes.icon}
                     disabled={Boolean(file)}
                     aria-label="select picture from disk"
                     component="span"
                  >
                     <PhotoCamera fontSize="large" />
                  </IconButton>
               </div>
            </Tooltip>
         </label>
      </>
   </Skeleton>
);

const DeleteImageButton = ({
   render,
   disabled,
   classes,
   handleRemoveAvatar,
}) => (
   <Skeleton render={render} classes={{ margin: 0, display: 'inline-block' }}>
      <Tooltip title="Usuń zdjęcie" placement="bottom" arrow>
         <div>
            <IconButton
               aria-label="delete current picture"
               disabled={disabled}
               className={classes.icon}
               onClick={handleRemoveAvatar}
            >
               <Delete fontSize="large" />
            </IconButton>
         </div>
      </Tooltip>
   </Skeleton>
);

const Avatar = () => (
   <div className={{ justifyContent: 'right' }}>
      <AvatarIcon huge variant="rounded" />
   </div>
);

export const ChangeAvatarForm = () => {
   const dispatch = useDispatch();
   const [file, setFile] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [openDialog2, setOpenDialog2] = useState(false);
   const { enqueueSnackbar } = useSnackbar();
   const user = useSelector(selectUserInfo);
   const avatar = useSelector(selectAvatar);
   const message = useSelector(selectMessage);
   const status = useSelector(selectStatus);
   const classes = useStyles();

   const handleFormSubmit = (event) => {
      event.preventDefault();
      setOpenDialog(false);
      dispatch(setAvatar(file));
      setFile(null);
   };
   const handleFileChange = (event) => setFile(event.target.files[0]);

   const handleRemoveAvatar = () => {
      setOpenDialog2(false);
      dispatch(removeAvatar());
   };

   const { name, surname, email, phone } = user;

   const shouldRender = Boolean(name) && Boolean(surname) && Boolean(email);

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

   return (
      <Paper className={classes.paper}>
         <form
            onSubmit={handleFormSubmit}
            data-testid="change-avatar-form"
            className={classes.form}
            id="change-avatar-form"
            noValidate
         >
            <div className={classes.header}>
               <Typography
                  variant="h5"
                  color="primary"
                  className={classes.title}
               >
                  Zdjęcie profilowe
               </Typography>
            </div>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <Avatar />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Grid container>
                     <Grid item xs={12}>
                        <UserInfo
                           render={shouldRender}
                           name={name}
                           surname={surname}
                           phone={phone}
                           email={email}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <div className={classes.headerButtons}>
                           <ChooseImageButton
                              render={shouldRender}
                              classes={classes}
                              file={file}
                              handleFileChange={handleFileChange}
                           />
                           <UploadImageButton
                              file={file}
                              classes={classes}
                              render={shouldRender}
                              setOpenDialog={setOpenDialog}
                           />
                           <DeleteImageButton
                              classes={classes}
                              disabled={Boolean(!avatar)}
                              handleRemoveAvatar={() => setOpenDialog2(true)}
                              render={shouldRender}
                           />
                        </div>
                        <SaveChangesDialog
                           openDialog={openDialog}
                           setOpenDialog={setOpenDialog}
                           form="change-avatar-form"
                        />
                        <SaveChangesDialog
                           openDialog={openDialog2}
                           setOpenDialog={setOpenDialog2}
                           callback={handleRemoveAvatar}
                           title="Czy na pewno chcesz usunąć awatar?"
                           buttonText="Usuń"
                        />
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </form>
      </Paper>
   );
};
