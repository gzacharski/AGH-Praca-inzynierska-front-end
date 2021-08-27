/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, LinearProgress } from '@material-ui/core';

import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchAdminUsersList,
} from 'src/main/store/sliceFiles/adminSlices/usersSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { UsersTable } from 'src/main/components/tables';

const AccountPage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const users = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const { authState = {} } = useAuth();
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(10);
   const { enqueueSnackbar } = useSnackbar();

   const fetchData = () => {
      const { token = '' } = authState;
      dispatch(fetchAdminUsersList({ pageNumber, pageSize, token }));
   };

   useEffect(() => {
      if (status === STATUS.IDLE) {
         fetchData();
      }
   }, [status, dispatch, pageNumber, pageSize]);

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
      <PageWrapper>
         <PageTitle>Użytkownicy</PageTitle>
         <Paper>
            {shouldRenderProgress && <LinearProgress />}
            <UsersTable
               pageNumber={pageNumber}
               pageSize={pageSize}
               setPageNumber={setPageNumber}
               setPageSize={setPageSize}
               users={users}
            />
         </Paper>
      </PageWrapper>
   );
};

export default AccountPage;
