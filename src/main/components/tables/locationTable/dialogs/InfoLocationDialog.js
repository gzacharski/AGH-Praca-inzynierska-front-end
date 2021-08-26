import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/locationsSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { LocationForm } from '../forms/LocationForm';

export const InfoLocationDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const { locationId = '', name = '', description = '' } = selectedRow;

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Sala treningowa: {name}
            </Typography>
         </DialogTitle>
         <DialogContent>
            <LocationForm
               description={description}
               locationId={locationId}
               name={name}
               onCloseCallback={closeDialog}
               readOnly
            />
         </DialogContent>
      </Dialog>
   );
};
