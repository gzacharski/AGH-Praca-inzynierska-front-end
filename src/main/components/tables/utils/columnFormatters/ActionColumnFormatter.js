/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import {
   Edit as EditIcon,
   Delete as DeleteIcon,
   MoreVert as InfoIcon,
} from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';

const ActionFormatter = ({ row }) => {
   const { documentId = '' } = row;
   const { setIdAndOpenDialog } = useContext(RowDialogContext);
   const { DELETE, EDIT, INFO } = DIALOG_MODE;

   return (
      <div>
         <Tooltip title="Pokaż więcej informacji" arrow>
            <IconButton
               onClick={() =>
                  setIdAndOpenDialog({ id: documentId, mode: INFO })
               }
            >
               <InfoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Edytuj" arrow>
            <IconButton
               onClick={() =>
                  setIdAndOpenDialog({ id: documentId, mode: EDIT })
               }
            >
               <EditIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Usuń" arrow>
            <IconButton
               onClick={() =>
                  setIdAndOpenDialog({ id: documentId, mode: DELETE })
               }
            >
               <DeleteIcon />
            </IconButton>
         </Tooltip>
      </div>
   );
};

export const ActionStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ActionFormatter} {...props} />
);
