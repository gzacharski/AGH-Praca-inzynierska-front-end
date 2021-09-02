/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   Typography,
   Divider,
   Button,
} from '@material-ui/core';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useDispatch } from 'react-redux';
import { deleteGroupTraining } from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { useAuth } from 'src/main/auth';
import { useStyles } from './RejectRequestDialog.styles';

export const RejectRequestDialog = () => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const {
      dialogState = {},
      closeDialog = () => false,
      entityId = '',
   } = useContext(DialogContext);

   const { mode = DIALOG_MODE.INFO, isOpen = false } = dialogState;
   const shouldOpen = mode === DIALOG_MODE.REJECT && isOpen;

   const handleSubmit = () => {
      console.log('reject');
      // dispatch(
      //    deleteGroupTraining({
      //       trainingId: entityId,
      //       token,
      //    }),
      // );
      closeDialog();
   };

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Czy na pewno chcesz odrzucić trening personalny?
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogActions>
            <Button onClick={handleSubmit} className={classes.button}>
               Odrzuć
            </Button>
            <Button
               variant="contained"
               className={classes.button}
               onClick={closeDialog}
            >
               Anuluj
            </Button>
         </DialogActions>
      </Dialog>
   );
};
