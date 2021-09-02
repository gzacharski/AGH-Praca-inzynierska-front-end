import React, { useState } from 'react';

export const DIALOG_MODE = {
   ADD: 'add',
   INFO: 'info',
   EDIT: 'edit',
   DELETE: 'delete',
   GYMPASS: 'gympass',
   ROLES: 'roles',
   ACCEPT: 'accept',
   REJECT: 'reject',
};

export const DialogContext = React.createContext();

export const DialogContextProvider = ({ children }) => {
   const [dialogState, setDialogState] = useState({
      mode: DIALOG_MODE.INFO,
      isOpen: false,
   });
   const [entityId, setEntityId] = useState('');

   const setIdAndOpenDialog = ({ id, mode }) => {
      setEntityId(id);
      setDialogState({ mode, isOpen: true });
   };

   const closeDialog = () => {
      setEntityId('');
      setDialogState({ mode: DIALOG_MODE.INFO, isOpen: false });
   };

   const openAddDialog = () =>
      setDialogState({ mode: DIALOG_MODE.ADD, isOpen: true });

   return (
      <DialogContext.Provider
         value={{
            entityId,
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
