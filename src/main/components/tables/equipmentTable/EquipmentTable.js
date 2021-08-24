import React from 'react';
import {
   IntegratedPaging,
   PagingState,
   SearchState,
   IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
   SearchPanel,
   Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
   ImageStateDataTypeProvider,
   EquipmentStateDataTypeProvider,
   TrainingsStateDataTypeProvider,
} from './formatters';

const tableMessages = {
   noData: 'Brak danych na temat sprzętu do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const columns = [
   { name: 'equipmentId', title: 'ID' },
   { name: 'image', title: 'Zdjęcie' },
   { name: 'title', title: 'Nazwa' },
   { name: 'state', title: 'Stan' },
   { name: 'quantity', title: 'Ilość' },
   { name: 'purchaseDate', title: 'Data zakupu' },
   { name: 'lastServiceDate', title: 'Data ostatniego serwisu' },
   { name: 'trainings', title: 'Przypisany do treningów' },
];

export const EquipmentTable = ({ data }) => (
   <Grid rows={data} columns={columns}>
      <ImageStateDataTypeProvider for={['image']} />
      <EquipmentStateDataTypeProvider for={['state']} />
      <TrainingsStateDataTypeProvider for={['trainings']} />

      <PagingState defaultCurrentPage={0} defaultPageSize={10} />
      <SearchState defaultValue="" />
      <IntegratedPaging />
      <IntegratedFiltering />
      <Table messages={tableMessages} />
      <TableHeaderRow />
      <Toolbar />
      <PagingPanel
         pageSizes={[5, 10, 20, 50, 0]}
         messages={pagingPanelMessages}
      />
      <SearchPanel />
   </Grid>
);
