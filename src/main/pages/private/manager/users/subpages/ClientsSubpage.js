import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchClientsList,
} from 'src/main/store/sliceFiles/users/clientSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const ClientsSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchClientsList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
   />
);
