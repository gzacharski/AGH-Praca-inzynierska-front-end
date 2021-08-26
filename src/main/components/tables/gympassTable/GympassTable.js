/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import {
   IntegratedPaging,
   PagingState,
   SearchState,
   DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { ActionFormatter } from 'src/main/components/tables/utils/columnFormatters';
import {
   PremiumStateDataTypeProvider,
   PriceStateDataTypeProvider,
   SubheaderStateDataTypeProvider,
   StatusStateDataTypeProvider,
} from 'src/main/components/tables/gympassTable/formatters';
import {
   RowDialogContextProvider,
   RowDialogContext,
} from 'src/main/components/contexts/RowDialogContext';
import {
   AddGympassDialog,
   DeleteGympassDialog,
   EditGympassDialog,
   InfoGympassDialog,
} from './dialogs';

const tableMessages = {
   noData: 'Brak danych na temat karnetów do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const columns = [
   { name: 'title', title: 'Tytuł' },
   { name: 'subheader', title: 'Podtytuł' },
   { name: 'price', title: 'Cena' },
   { name: 'isPremium', title: 'Premium' },
   { name: 'status', title: 'Status' },
   { name: '_action', title: 'Akcja' },
];

const columnExtensions = [
   { columnName: 'subheader', wordWrapEnabled: true },
   { columnName: 'title', wordWrapEnabled: true },
];

const ActionFormatterAdapter = ({ row }) => {
   const { documentId = '' } = row;
   return <ActionFormatter id={documentId} />;
};

const ActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ActionFormatterAdapter} {...props} />
);

const HeaderCell = ({ column, ...restProps }) => {
   const { openAddDialog } = useContext(RowDialogContext);
   if (column.name === '_action') {
      return (
         <TableHeaderRow.Cell {...restProps}>
            <span>{column.title}</span>
            <Tooltip title="Dodaj nowy typ karnetu" arrow>
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

export const GympassTable = ({ data }) => (
   <RowDialogContextProvider>
      <Grid rows={data} columns={columns}>
         <PremiumStateDataTypeProvider for={['isPremium']} />
         <PriceStateDataTypeProvider for={['price']} />
         <SubheaderStateDataTypeProvider for={['subheader']} />
         <StatusStateDataTypeProvider for={['status']} />
         <ActionStateDataTypeProvider for={['_action']} />

         <PagingState defaultCurrentPage={0} defaultPageSize={10} />
         <SearchState defaultValue="" />
         <IntegratedPaging />
         <Table messages={tableMessages} columnExtensions={columnExtensions} />
         <TableHeaderRow cellComponent={HeaderCell} />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <AddGympassDialog />
      <InfoGympassDialog />
      <EditGympassDialog />
      <DeleteGympassDialog />
   </RowDialogContextProvider>
);
