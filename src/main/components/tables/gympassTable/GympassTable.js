import React from 'react';
import {
   IntegratedPaging,
   PagingState,
   SearchState,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { ActionStateDataTypeProvider } from 'src/main/components/tables/utils/columnFormatters';
import {
   PremiumStateDataTypeProvider,
   PriceStateDataTypeProvider,
   SubheaderStateDataTypeProvider,
   StatusStateDataTypeProvider,
} from 'src/main/components/tables/gympassTable/formatters';
import { RowDialogContextProvider } from 'src/main/components/contexts/RowDialogContext';
import {
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
         <TableHeaderRow />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <InfoGympassDialog />
      <EditGympassDialog />
      <DeleteGympassDialog />
   </RowDialogContextProvider>
);
