import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchClientsList,
} from 'src/main/store/sliceFiles/users/clientSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { UsersTable } from 'src/main/components/tables';

export const ClientsSubpage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const users = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const auth = useAuth();
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(10);
   const { enqueueSnackbar } = useSnackbar();

   const fetchData = () => {
      const { token = '' } = auth;
      dispatch(fetchClientsList({ pageNumber, pageSize, token }));
   };

   useEffect(() => {
      if (status === STATUS.IDLE) {
         fetchData();
      }
   }, [status, dispatch]);

   if (message) {
      enqueueSnackbar(message, {
         variant: notistackVariant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;

   return (
      <>
         {shouldRenderProgress && <LinearProgress />}
         <UsersTable
            users={users}
            pageNumber={pageNumber}
            pageSize={pageSize}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
         />
      </>
   );
};
