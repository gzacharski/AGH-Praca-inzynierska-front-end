import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchManagersList,
   selectById,
} from 'src/main/store/sliceFiles/users/managerSlice';
import { changeClientRoles } from 'src/main/store/sliceFiles/users/clientSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const ManagersSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchManagersList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
      selectById={selectById}
      changeClientRoles={changeClientRoles}
   />
);
