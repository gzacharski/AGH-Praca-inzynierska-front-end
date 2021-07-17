import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
   Paper,
   Typography,
   Button,
   Dialog,
   DialogTitle,
   DialogActions,
} from '@material-ui/core';
import { accountServiceURL } from 'src/main/data/urls';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './DeleteAccountForm.styles';

export const DeleteAccountForm = () => {
   const classes = useStyles();
   const context = useContext(AuthContext);
   const { enqueueSnackbar } = useSnackbar();
   const [openDialog, setOpenDialog] = useState(false);

   const { token, userInfo } = context.authState;

   const handleClick = () => {
      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      const { userId } = userInfo;

      axios
         .delete(`${accountServiceURL}/${userId}`, config)
         .then((response) => {
            if (response?.data?.message) {
               const { message } = response.data;
               enqueueSnackbar(message, {
                  variant: 'success',
                  anchorOrigin: {
                     vertical: 'bottom',
                     horizontal: 'right',
                  },
               });
            }
            setTimeout(() => context.logout(), 1000);
         })
         .catch((error) => {
            if (error?.response?.data?.message) {
               const { message } = error.response.data;
               enqueueSnackbar(message, {
                  variant: 'error',
                  anchorOrigin: {
                     vertical: 'bottom',
                     horizontal: 'right',
                  },
               });
            }
         });
   };
   return (
      <Paper className={classes.paper}>
         <div className={classes.header}>
            <Typography
               component="h2"
               variant="h5"
               color="primary"
               className={classes.title}
               data-testid="delete-account"
            >
               Usuń konto
            </Typography>
         </div>
         <div className={classes.content}>
            <Typography color="textSecondary">
               Klikając w przycisk usuniesz swoje konto w serwisie.
            </Typography>
            <Typography color="textSecondary">
               Operacja jest nieodwracalna.
            </Typography>
            <div className={classes.buttonWrapper}>
               <Button
                  className={classes.button}
                  onClick={() => setOpenDialog(true)}
               >
                  Usuń konto
               </Button>
            </div>
         </div>
         <Dialog
            open={openDialog}
            maxWidth="sm"
            fullWidth
            onClose={() => setOpenDialog(false)}
         >
            <DialogTitle>
               <Typography variant="h6" color="primary">
                  Czy na pewno chcesz usunąć konto?
               </Typography>
            </DialogTitle>
            <DialogActions>
               <Button className={classes.dialogButton} onClick={handleClick}>
                  Usuń
               </Button>
               <Button
                  className={classes.dialogButton}
                  onClick={() => setOpenDialog(false)}
               >
                  Anuluj
               </Button>
            </DialogActions>
         </Dialog>
      </Paper>
   );
};
