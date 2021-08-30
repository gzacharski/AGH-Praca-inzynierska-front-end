import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/managerSlices/gympassSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { GympassForm } from '../forms/GympassForm';

export const InfoGympassDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(DialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const {
      documentId = '',
      title = '',
      subheader = '',
      price = {},
      isPremium = false,
      description = {},
   } = selectedRow;

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Edytuj karnet
            </Typography>
         </DialogTitle>
         <DialogContent>
            <GympassForm
               documentId={documentId}
               title={title}
               subheader={subheader}
               price={price}
               isPremium={isPremium}
               description={description}
               onCloseCallback={closeDialog}
               readOnly
            />
         </DialogContent>
      </Dialog>
   );
};
