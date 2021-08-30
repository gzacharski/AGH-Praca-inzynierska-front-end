import React, { useContext } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { createTrainingType } from 'src/main/store/sliceFiles/workoutSlice';
import { TrainingTypeForm } from './forms/TrainingTypeForm';

export const AddEquipmentDialog = () => {
   const { dialogState, closeDialog } = useContext(DialogContext);
   const { ADD, INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const shouldOpen = mode === ADD && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Dodaj nowy sprzęt fitness
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
