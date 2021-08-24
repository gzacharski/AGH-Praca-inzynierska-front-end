import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { UsersTable } from 'src/main/components/tables';

export const AbstractSubpage = ({
   selectStatus,
   selectAll,
   selectMessage,
   selectNotistack,
   fetchData,
   clearMessage,
}) => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const users = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const auth = useAuth();
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(10);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = auth;
         dispatch(fetchData({ pageNumber, pageSize, token }));
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
