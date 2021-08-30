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
import { addEquipment } from 'src/main/store/sliceFiles/equipmentSlice';
import { EquipmentForm } from './forms/EquipmentForm';

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
            <EquipmentForm
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={addEquipment}
            />
         </DialogContent>
      </Dialog>
   );
};
