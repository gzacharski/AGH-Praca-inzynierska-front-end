import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Typography } from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/workoutSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';

export const DeleteTrainingTypeDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { DELETE } = DIALOG_MODE;
   const { mode = DELETE, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId));

   const shouldOpen = mode === DELETE && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <Typography>Usuń</Typography>
         {JSON.stringify(selectedRow)}
      </Dialog>
   );
};
