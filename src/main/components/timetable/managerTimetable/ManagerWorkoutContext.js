import React, { useState } from 'react';

export const ManagerWorkoutContext = React.createContext();

export const ManagerWorkoutContextProvider = ({ children }) => {
   const [openDialog, setOpenDialog] = useState(false);
   return (
      <ManagerWorkoutContext.Provider
         value={{
            openDialog,
            setOpenDialog: (state) => setOpenDialog(state),
         }}
      >
         {children}
      </ManagerWorkoutContext.Provider>
   );
};
