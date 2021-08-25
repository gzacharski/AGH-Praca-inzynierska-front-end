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
import { ImageStateDataTypeProvider } from '../equipmentTable/formatters';

const tableMessages = {
   noData: 'Brak danych na temat sal treningowych do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const columns = [
   { name: 'locationId', title: 'ID' },
   { name: 'name', title: 'Nazwa' },
   { name: 'image', title: 'Zdjęcie' },
   { name: 'area', title: 'Powierzchnia' },
   { name: 'description', title: 'Opis/Uwagi' },
];

export const LocationTable = ({ data }) => (
   <Grid rows={data} columns={columns}>
      <ImageStateDataTypeProvider for={['image']} />

      <PagingState defaultCurrentPage={0} defaultPageSize={10} />
      <SearchState defaultValue="" />
      <IntegratedPaging />
      <Table messages={tableMessages} />
      <TableHeaderRow />
      <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
   </Grid>
);
