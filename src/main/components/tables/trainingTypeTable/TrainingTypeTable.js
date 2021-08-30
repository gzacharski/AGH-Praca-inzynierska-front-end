/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import {
   IntegratedPaging,
   PagingState,
   DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
   ImageStateDataTypeProvider,
   AvatarStateDataTypeProvider,
   ActionFormatter,
} from 'src/main/components/tables/utils/columnFormatters';
import {
   DialogContextProvider,
   DialogContext,
} from 'src/main/components/contexts/DialogContext';
import {
   DeleteTrainingTypeDialog,
   EditTrainingTypeDialog,
   InfoTrainingTypeDialog,
   AddTrainingTypeDialog,
} from './dialogs';

const columns = [
   // { name: 'trainingTypeId', title: 'ID' },
   { name: 'image', title: 'Zdjęcie' },
   { name: 'name', title: 'Nazwa' },
   { name: 'duration', title: 'Czas trwania' },
   { name: '_action', title: 'Akcja' },
];

const tableMessages = {
   noData: 'Brak typów treningu do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const ActionFormatterAdapter = ({ row }) => {
   const { trainingTypeId = '' } = row;
   return <ActionFormatter id={trainingTypeId} />;
};

const ActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ActionFormatterAdapter} {...props} />
);

const HeaderCell = ({ column, ...restProps }) => {
   const { openAddDialog } = useContext(DialogContext);
   if (column.name === '_action') {
      return (
         <TableHeaderRow.Cell {...restProps}>
            <span>{column.title}</span>
            <Tooltip title="Dodaj nowy typ treningu" arrow>
               <IconButton
                  onClick={openAddDialog}
                  style={{ marginLeft: '30px' }}
               >
                  <AddIcon />
               </IconButton>
            </Tooltip>
         </TableHeaderRow.Cell>
      );
   }
   return <TableHeaderRow.Cell {...restProps} />;
};

export const TrainingTypeTable = ({
   trainingTypes,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <DialogContextProvider>
      <Grid rows={trainingTypes} columns={columns}>
         <AvatarStateDataTypeProvider for={['trainer']} />
         <ImageStateDataTypeProvider for={['image']} />
         <ActionStateDataTypeProvider for={['_action']} />
         <PagingState
            currentPage={pageNumber}
            pageSize={pageSize}
            onCurrentPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
         />
         <IntegratedPaging />
         <Table messages={tableMessages} />
         <TableHeaderRow cellComponent={HeaderCell} />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <AddTrainingTypeDialog />
      <DeleteTrainingTypeDialog />
      <EditTrainingTypeDialog />
      <InfoTrainingTypeDialog />
   </DialogContextProvider>
);
