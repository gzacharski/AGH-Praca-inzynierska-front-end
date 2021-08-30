import React, { useState } from 'react';

export const DIALOG_MODE = {
   ADD: 'add',
   INFO: 'info',
   EDIT: 'edit',
   DELETE: 'delete',
};

export const DialogContext = React.createContext();

export const DialogContextProvider = ({ children }) => {
   const [dialogState, setDialogState] = useState({
      mode: DIALOG_MODE.INFO,
      isOpen: false,
   });
   const [rowId, setRowId] = useState('');

   const setIdAndOpenDialog = ({ id, mode }) => {
      setRowId(id);
      setDialogState({ mode, isOpen: true });
   };

   const closeDialog = () => {
      setRowId('');
      setDialogState({ mode: DIALOG_MODE.INFO, isOpen: false });
   };

   const openAddDialog = () =>
      setDialogState({ mode: DIALOG_MODE.ADD, isOpen: true });

   return (
      <DialogContext.Provider
         value={{
            rowId,
            dialogState,
            setIdAndOpenDialog,
            closeDialog,
            openAddDialog,
         }}
      >
         {children}
      </DialogContext.Provider>
   );
};
