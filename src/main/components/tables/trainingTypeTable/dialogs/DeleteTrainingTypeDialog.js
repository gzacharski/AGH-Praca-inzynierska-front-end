import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   Dialog,
   Typography,
   DialogTitle,
   DialogActions,
   Button,
} from '@material-ui/core';
import {
   selectById,
   deleteTrainingType,
} from 'src/main/store/sliceFiles/workoutSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useAuth } from 'src/main/auth';

export const DeleteTrainingTypeDialog = () => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { DELETE } = DIALOG_MODE;
   const { mode = DELETE, isOpen = false } = dialogState;
   const { authState = {} } = useAuth();
   const dispatch = useDispatch();

   const selectedRow = useSelector((state) => selectById(state, entityId)) || {};

   const { trainingTypeId = '', name = '' } = selectedRow;

   const shouldOpen = mode === DELETE && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Czy na pewno chcesz usunąć {name}?
            </Typography>
         </DialogTitle>
         <DialogActions>
            <Button
               onClick={() => {
                  closeDialog();
                  const { token = '' } = authState;
                  dispatch(deleteTrainingType({ token, trainingTypeId }));
               }}
            >
               Usuń
            </Button>
            <Button onClick={() => closeDialog()}>Anuluj</Button>
         </DialogActions>
      </Dialog>
   );
};
