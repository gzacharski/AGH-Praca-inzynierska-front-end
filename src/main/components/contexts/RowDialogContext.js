import React, { useState } from 'react';

export const DIALOG_MODE = {
   INFO: 'info',
   EDIT: 'edit',
   DELETE: 'delete',
};

export const RowDialogContext = React.createContext();

export const RowDialogContextProvider = ({ children }) => {
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

   return (
      <RowDialogContext.Provider
         value={{
            rowId,
            dialogState,
            setIdAndOpenDialog,
            closeDialog,
         }}
      >
         {children}
      </RowDialogContext.Provider>
   );
};
