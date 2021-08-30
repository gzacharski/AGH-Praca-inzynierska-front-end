import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress, Paper } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { EquipmentTable } from 'src/main/components/tables';
import {
   fetchEquipmentList,
   selectAll,
   clearMessage,
   selectStatus,
   selectNotistack,
   selectMessage,
} from 'src/main/store/sliceFiles/equipmentSlice';
import { STATUS } from 'src/main/store/status';

const EquipmentPage = () => {
   const status = useSelector(selectStatus);
   const equipmentList = useSelector(selectAll);
   const dispatch = useDispatch();
   const notistackVariant = useSelector(selectNotistack);
   const message = useSelector(selectMessage);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         dispatch(fetchEquipmentList({}));
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
      <PageWrapper>
         <PageTitle>Zarządzaj sprzętem fitness</PageTitle>
         <Paper>
            {shouldRenderProgress && <LinearProgress />}
            <EquipmentTable data={equipmentList} />
         </Paper>
      </PageWrapper>
   );
};

export default EquipmentPage;
