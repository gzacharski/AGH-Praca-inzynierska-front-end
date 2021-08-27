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
   editGympass,
} from 'src/main/store/sliceFiles/managerSlices/gympassSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { GympassForm } from '../forms/GympassForm';

export const EditGympassDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const {
      documentId = '',
      title = '',
      subheader = '',
      price = {},
      isPremium = false,
      description = {},
   } = selectedRow;

   const shouldOpen = mode === EDIT && isOpen;

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
               onSubmitReduxCallback={editGympass}
            />
         </DialogContent>
      </Dialog>
   );
};
