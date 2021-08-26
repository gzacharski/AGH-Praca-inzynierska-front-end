import React from 'react';
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
import { RowDialogContextProvider } from 'src/main/components/contexts/RowDialogContext';
import {
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
   { name: 'image', title: 'Zdjęcie' },
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

export const LocationTable = ({ data }) => (
   <RowDialogContextProvider>
      <Grid rows={data} columns={columns}>
         <ImageStateDataTypeProvider for={['image']} />
         <ActionStateDataTypeProvider for={['_action']} />

         <PagingState defaultCurrentPage={0} defaultPageSize={10} />
         <SearchState defaultValue="" />
         <IntegratedPaging />
         <Table messages={tableMessages} />
         <TableHeaderRow />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <DeleteLocationDialog />
      <EditLocationDialog />
      <InfoLocationDialog />
   </RowDialogContextProvider>
);
