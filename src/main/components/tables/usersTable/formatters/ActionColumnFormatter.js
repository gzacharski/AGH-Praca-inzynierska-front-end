/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { MoreVert as InfoIcon } from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';

const ActionFormatter = ({ row }) => {
   const { userId = '' } = row;
   const { setIdAndOpenDialog } = useContext(RowDialogContext);

   return (
      <Tooltip title="Pokaż więcej informacji" arrow>
         <IconButton
            onClick={() =>
               setIdAndOpenDialog({ id: userId, mode: DIALOG_MODE.INFO })
            }
         >
            <InfoIcon />
         </IconButton>
      </Tooltip>
   );
};

export const ActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ActionFormatter} {...props} />
);
