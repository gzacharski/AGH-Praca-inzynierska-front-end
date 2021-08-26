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
import { addLocation } from 'src/main/store/sliceFiles/locationsSlice';
import { LocationForm } from '../forms/LocationForm';

export const AddLocationDialog = () => {
   const { dialogState, closeDialog } = useContext(RowDialogContext);
   const { ADD, INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const shouldOpen = mode === ADD && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Dodaj nową salę treningową
            </Typography>
         </DialogTitle>
         <DialogContent>
            <LocationForm
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={addLocation}
            />
         </DialogContent>
      </Dialog>
   );
};
