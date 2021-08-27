import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   Dialog,
   Typography,
   DialogTitle,
   DialogActions,
   Button,
} from '@material-ui/core';
import {
   selectById,
   deleteLocation,
} from 'src/main/store/sliceFiles/locationsSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';
import { useAuth } from 'src/main/auth';

export const DeleteLocationDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { DELETE } = DIALOG_MODE;
   const { mode = DELETE, isOpen = false } = dialogState;
   const { authState = {} } = useAuth();
   const dispatch = useDispatch();

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};

   const { locationId = '', name = '' } = selectedRow;

   const shouldOpen = mode === DELETE && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Czy na pewno chcesz usunąć {name}?
            </Typography>
         </DialogTitle>
         <DialogActions>
            <Button
               onClick={() => {
                  closeDialog();
                  const { token = '' } = authState;
                  dispatch(deleteLocation({ token, locationId }));
               }}
            >
               Usuń
            </Button>
            <Button onClick={() => closeDialog()}>Anuluj</Button>
         </DialogActions>
      </Dialog>
   );
};
