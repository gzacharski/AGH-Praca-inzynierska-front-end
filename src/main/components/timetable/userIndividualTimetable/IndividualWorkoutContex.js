import React, { useState } from 'react';

export const IndividualWorkoutContext = React.createContext();

export const IndividualWorkoutContextProvider = ({ children }) => {
   const [openDialog, setOpenDialog] = useState(false);
   return (
      <IndividualWorkoutContext.Provider
         value={{
            openDialog,
            setOpenDialog: (state) => setOpenDialog(state),
         }}
      >
         {children}
      </IndividualWorkoutContext.Provider>
   );
};
