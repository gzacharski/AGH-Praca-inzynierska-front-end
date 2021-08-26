import React, { useContext } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { createTrainingType } from 'src/main/store/sliceFiles/workoutSlice';
import { TrainingTypeForm } from './forms/TrainingTypeForm';

export const AddTrainingTypeDialog = () => {
   const { dialogState, closeDialog } = useContext(RowDialogContext);
   const { ADD, INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const shouldOpen = mode === ADD && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Dodaj nowy typ treningu
            </Typography>
         </DialogTitle>
         <DialogContent>
            <TrainingTypeForm
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={createTrainingType}
            />
         </DialogContent>
      </Dialog>
   );
};
