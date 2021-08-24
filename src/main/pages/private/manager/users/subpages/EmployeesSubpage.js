import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchEmployeesList,
} from 'src/main/store/sliceFiles/users/employeesSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const EmployeesSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchEmployeesList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
   />
);
