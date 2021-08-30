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
import { useStyles } from './DeleteWorkoutDialog.styles';

export const DeleteWorkoutDialog = () => {
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
   const shouldOpen = mode === DIALOG_MODE.DELETE && isOpen;

   const handleSubmit = () => {
      dispatch(
         deleteGroupTraining({
            trainingId: entityId,
            token,
         }),
      );
      closeDialog();
   };

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Usunąć wybrany trening?
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogActions>
            <Button onClick={handleSubmit} className={classes.button}>
               Usuń
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
