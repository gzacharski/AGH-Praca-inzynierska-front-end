import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchTrainersList,
   selectById,
} from 'src/main/store/sliceFiles/users/trainersSlice';
import { changeClientRoles } from 'src/main/store/sliceFiles/users/clientSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const TrainersSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchTrainersList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
      selectById={selectById}
      changeClientRoles={changeClientRoles}
   />
);
