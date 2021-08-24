import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchManagersList,
} from 'src/main/store/sliceFiles/users/managerSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const ManagersSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchManagersList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
   />
);
