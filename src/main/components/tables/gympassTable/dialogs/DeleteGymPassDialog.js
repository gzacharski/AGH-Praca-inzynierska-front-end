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
   deleteGympass,
} from 'src/main/store/sliceFiles/managerSlices/gympassSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useAuth } from 'src/main/auth';

export const DeleteGympassDialog = () => {
   const { dialogState, closeDialog, rowId } = useContext(DialogContext);
   const { DELETE } = DIALOG_MODE;
   const { mode = DELETE, isOpen = false } = dialogState;
   const { authState = {} } = useAuth();
   const dispatch = useDispatch();

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const { documentId = '', title = '' } = selectedRow;

   const shouldOpen = mode === DELETE && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog}>
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Czy na pewno chcesz usunąć karnet: {title}?
            </Typography>
         </DialogTitle>
         <DialogActions>
            <Button
               onClick={() => {
                  closeDialog();
                  const { token = '' } = authState;
                  dispatch(deleteGympass({ token, documentId }));
               }}
            >
               Usuń
            </Button>
            <Button onClick={() => closeDialog()}>Anuluj</Button>
         </DialogActions>
      </Dialog>
   );
};
