import React, { useState } from 'react';

export const UserEquipmentContext = React.createContext();

export const UserEquipmentContextProvider = ({ children }) => {
   const [openDialog, setOpenDialog] = useState(false);
   return (
      <UserEquipmentContext.Provider
         value={{
            openDialog,
            setOpenDialog: (state) => setOpenDialog(state),
         }}
      >
         {children}
      </UserEquipmentContext.Provider>
   );
};
