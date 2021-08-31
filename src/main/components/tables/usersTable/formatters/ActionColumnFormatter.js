/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import {
   MoreVert as InfoIcon,
   Payment as PaymentIcon,
} from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { ActionFormatter } from 'src/main/components/tables/utils/columnFormatters';

const EmployeeActionFormatter = ({ row = {} }) => {
   const { userId = '' } = row;
   const { setIdAndOpenDialog } = useContext(DialogContext);

   return (
      <div>
         <Tooltip title="Pokaż więcej informacji" arrow>
            <IconButton
               onClick={() =>
                  setIdAndOpenDialog({ id: userId, mode: DIALOG_MODE.INFO })
               }
            >
               <InfoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Karnet" arrow>
            <IconButton
               onClick={() =>
                  setIdAndOpenDialog({ id: userId, mode: DIALOG_MODE.GYMPASS })
               }
            >
               <PaymentIcon />
            </IconButton>
         </Tooltip>
      </div>
   );
};

export const ActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ActionFormatter} {...props} />
);

export const EmployeeActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={EmployeeActionFormatter} {...props} />
);
