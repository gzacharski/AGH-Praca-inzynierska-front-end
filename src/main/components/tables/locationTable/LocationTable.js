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
import {
   ImageStateDataTypeProvider,
   ActionFormatter,
} from 'src/main/components/tables/utils/columnFormatters';
import { SubheaderStateDataTypeProvider } from 'src/main/components/tables/gympassTable/formatters/SubheaderColumnFormatter';
import {
   DialogContextProvider,
   DialogContext,
} from 'src/main/components/contexts/DialogContext';
import {
   AddLocationDialog,
   DeleteLocationDialog,
   EditLocationDialog,
   InfoLocationDialog,
} from './dialogs';

const tableMessages = {
   noData: 'Brak danych na temat sal treningowych do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const columns = [
   { name: 'name', title: 'Nazwa' },
   { name: 'area', title: 'Powierzchnia' },
   { name: 'description', title: 'Opis/Uwagi' },
   { name: '_action', title: 'Akcja' },
];

const ActionFormatterAdapter = ({ row }) => {
   const { locationId = '' } = row;
   return <ActionFormatter id={locationId} />;
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
            <Tooltip title="Dodaj nową salę treningową" arrow>
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

export const LocationTable = ({ data }) => (
   <DialogContextProvider>
      <Grid rows={data} columns={columns}>
         <ImageStateDataTypeProvider for={['image']} />
         <ActionStateDataTypeProvider for={['_action']} />
         <SubheaderStateDataTypeProvider for={['description', 'area']} />

         <PagingState defaultCurrentPage={0} defaultPageSize={10} />
         <SearchState defaultValue="" />
         <IntegratedPaging />
         <Table messages={tableMessages} />
         <TableHeaderRow cellComponent={HeaderCell} />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <AddLocationDialog />
      <DeleteLocationDialog />
      <EditLocationDialog />
      <InfoLocationDialog />
   </DialogContextProvider>
);
