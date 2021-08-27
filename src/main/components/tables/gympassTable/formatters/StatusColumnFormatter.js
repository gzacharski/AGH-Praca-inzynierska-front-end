/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const StatusFormatter = ({ value }) => {
   if (value === 'inactive') {
      return (
         <Chip
            label="Nieaktywny"
            size="small"
            style={{ backgroundColor: 'mediumTurquoise' }}
         />
      );
   }
   if (value === 'archive') return <Chip label="Archiwalny" size="small" />;

   return (
      <Chip
         label="Aktywny"
         size="small"
         style={{ backgroundColor: 'limegreen' }}
      />
   );
};

export const StatusStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={StatusFormatter} {...props} />
);
