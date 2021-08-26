import React from 'react';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchTrainersList,
} from 'src/main/store/sliceFiles/users/trainersSlice';
import { AbstractSubpage } from './AbstractSubpage';

export const TrainersSubpage = () => (
   <AbstractSubpage
      clearMessage={clearMessage}
      fetchData={fetchTrainersList}
      selectAll={selectAll}
      selectMessage={selectMessage}
      selectNotistack={selectNotistack}
      selectStatus={selectStatus}
   />
);
