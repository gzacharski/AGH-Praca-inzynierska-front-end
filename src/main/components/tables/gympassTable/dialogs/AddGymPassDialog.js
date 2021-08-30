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
import { addGympass } from 'src/main/store/sliceFiles/managerSlices/gympassSlice';
import { GympassForm } from '../forms/GympassForm';

export const AddGympassDialog = () => {
   const { dialogState, closeDialog } = useContext(DialogContext);
   const { ADD } = DIALOG_MODE;
   const { mode = ADD, isOpen = false } = dialogState;

   const shouldOpen = mode === ADD && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Dodaj nowy typ karnetu
            </Typography>
         </DialogTitle>
         <DialogContent>
            <GympassForm
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={addGympass}
            />
         </DialogContent>
      </Dialog>
   );
};
