import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/workoutSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { TrainingTypeForm } from './forms/TrainingTypeForm';

export const InfoTrainingTypeDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const {
      trainingTypeId = '',
      name = '',
      image = '',
      description = '',
      trainer = {},
      duration = '',
   } = selectedRow;

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Szczegółowe informacje o treningu: {name}
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
               readOnly
            />
         </DialogContent>
      </Dialog>
   );
};
