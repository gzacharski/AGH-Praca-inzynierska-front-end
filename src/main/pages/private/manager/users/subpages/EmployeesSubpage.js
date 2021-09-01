import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchEmployeesList,
   selectById,
} from 'src/main/store/sliceFiles/users/employeesSlice';
import { changeClientRoles } from 'src/main/store/sliceFiles/users/clientSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const EmployeesSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchEmployeesList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
      selectById={selectById}
      changeClientRoles={changeClientRoles}
   />
);
