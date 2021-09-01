/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import {
   MoreVert as InfoIcon,
   Payment as PaymentIcon,
   GroupAdd as GroupAddIcon,
   Edit as EditIcon,
   Delete as DeleteIcon,
} from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';

const { ADD, DELETE, EDIT, GYMPASS, INFO, ROLES } = DIALOG_MODE;

const EmployeeActionFormatter = ({ row = {} }) => {
   const { userId = '' } = row;
   const { setIdAndOpenDialog } = useContext(DialogContext);

   return (
      <div>
         <Tooltip title="Pokaż więcej informacji" arrow>
            <IconButton
               onClick={() => setIdAndOpenDialog({ id: userId, mode: INFO })}
            >
               <InfoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Karnet" arrow>
            <IconButton
               onClick={() => setIdAndOpenDialog({ id: userId, mode: GYMPASS })}
            >
               <PaymentIcon />
            </IconButton>
         </Tooltip>
      </div>
   );
};

const ManagerActionFormatter = ({ row = {} }) => {
   const { userId = '' } = row;
   const { setIdAndOpenDialog } = useContext(DialogContext);

   return (
      <div>
         <Tooltip title="Pokaż więcej informacji" arrow>
            <IconButton
               onClick={() => {
                  setIdAndOpenDialog({ id: userId, mode: INFO });
               }}
            >
               <InfoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Zmień role" arrow>
            <IconButton
               onClick={() => {
                  setIdAndOpenDialog({ id: userId, mode: ROLES });
               }}
            >
               <GroupAddIcon />
            </IconButton>
         </Tooltip>
      </div>
   );
};

const AdminActionFormatter = ({ row = {} }) => {
   const { userId = '' } = row;
   const { setIdAndOpenDialog } = useContext(DialogContext);

   return (
      <div>
         <Tooltip title="Pokaż więcej informacji" arrow>
            <IconButton
               onClick={() => setIdAndOpenDialog({ id: userId, mode: INFO })}
            >
               <InfoIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Edytuj" arrow>
            <IconButton
               onClick={() => setIdAndOpenDialog({ id: userId, mode: EDIT })}
            >
               <EditIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Usuń" arrow>
            <IconButton
               onClick={() => setIdAndOpenDialog({ id: userId, mode: DELETE })}
            >
               <DeleteIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Zmień role" arrow>
            <IconButton
               onClick={() => {
                  setIdAndOpenDialog({ id: userId, mode: ROLES });
               }}
            >
               <GroupAddIcon />
            </IconButton>
         </Tooltip>
      </div>
   );
};

export const AdminActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={AdminActionFormatter} {...props} />
);

export const EmployeeActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={EmployeeActionFormatter} {...props} />
);

export const ManagerActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ManagerActionFormatter} {...props} />
);
