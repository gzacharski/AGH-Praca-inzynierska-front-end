import React, { useState } from 'react';

export const CurrentDateContext = React.createContext();

export const CurrentDateContextProvider = ({ children }) => {
   const [currentDate, setCurrentDate] = useState(new Date());
   return (
      <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
         {children}
      </CurrentDateContext.Provider>
   );
};
