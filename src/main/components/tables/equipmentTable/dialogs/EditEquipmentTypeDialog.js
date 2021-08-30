import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import {
   selectById,
   updateTrainingType,
} from 'src/main/store/sliceFiles/workoutSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { EquipmentForm } from './forms/EquipmentForm';

export const EditEquipmentDialog = () => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const selectedRow =
      useSelector((state) => selectById(state, entityId)) || {};
   const {
      trainingTypeId = '',
      name = '',
      image = '',
      description = '',
      trainer = {},
      duration = '',
   } = selectedRow;

   const shouldOpen = mode === EDIT && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               {name} - edytuj sprzęt fitness
            </Typography>
         </DialogTitle>
         <DialogContent>
            <EquipmentForm
               title={name}
               description={description}
               image={image}
               duration={duration}
               trainer={trainer}
               trainingTypeId={trainingTypeId}
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={updateTrainingType}
            />
         </DialogContent>
      </Dialog>
   );
};
