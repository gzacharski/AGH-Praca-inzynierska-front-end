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
   updateLocation,
} from 'src/main/store/sliceFiles/locationsSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { LocationForm } from '../forms/LocationForm';

export const EditLocationDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(DialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};

   const { locationId = '', name = '', description = '' } = selectedRow;

   const shouldOpen = mode === EDIT && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Edytuj salę treningową {name}
            </Typography>
         </DialogTitle>
         <DialogContent>
            <LocationForm
               description={description}
               locationId={locationId}
               name={name}
               onCloseCallback={closeDialog}
               onSubmitReduxCallback={updateLocation}
            />
         </DialogContent>
      </Dialog>
   );
};
