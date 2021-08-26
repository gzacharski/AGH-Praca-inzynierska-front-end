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
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { TrainingTypeForm } from './forms/TrainingTypeForm';

export const EditTrainingTypeDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
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
               {name} - edytuj typ treningu
            </Typography>
         </DialogTitle>
         <DialogContent>
            <TrainingTypeForm
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
