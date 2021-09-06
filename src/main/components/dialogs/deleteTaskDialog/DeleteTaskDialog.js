/* eslint-disable no-unused-vars */
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
   deleteTask,
} from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useAuth } from 'src/main/auth';

export const DeleteGympassDialog = () => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { EDIT } = DIALOG_MODE;
   const { mode = EDIT, isOpen = false } = dialogState;

   const { authState = {} } = useAuth();
   const dispatch = useDispatch();

   const taskToDelete =
      useSelector((state) => selectById(state, entityId)) || {};
   const { title = '' } = taskToDelete;

   const shouldOpen = mode === EDIT && isOpen;
   return (
      <>
         {taskToDelete && (
            <Dialog open={shouldOpen} onClose={closeDialog}>
               <DialogTitle>
                  <Typography variant="h6" color="primary">
                     Czy na pewno chcesz usunąć zadanie: {title}?
                  </Typography>
               </DialogTitle>
               <DialogActions>
                  <Button
                     onClick={() => {
                        closeDialog();
                        const { token = '' } = authState;
                        dispatch(deleteTask({ token, taskId: entityId }));
                     }}
                  >
                     Usuń
                  </Button>
                  <Button onClick={closeDialog}>Anuluj</Button>
               </DialogActions>
            </Dialog>
         )}
      </>
   );
};
