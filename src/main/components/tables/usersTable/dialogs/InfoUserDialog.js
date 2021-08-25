import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Typography } from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/users/clientSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';

export const InfoTrainingTypeDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId));

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <Typography>Więcej informacji</Typography>
         {JSON.stringify(selectedRow)}
      </Dialog>
   );
};
