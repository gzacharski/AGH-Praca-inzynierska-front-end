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
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow =
      useSelector((state) => selectById(state, entityId)) || {};
   const {
      documentId = '',
      title = '',
      subheader = '',
      price = {},
      premium = false,
      description = {},
      temporaryPass = false,
      quantity = 1,
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
               premium={premium}
               description={description}
               onCloseCallback={closeDialog}
               isTemporaryPass={temporaryPass}
               quantity={quantity}
               readOnly
            />
         </DialogContent>
      </Dialog>
   );
};
