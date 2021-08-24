import React from 'react';
import { IntegratedPaging, PagingState } from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
   AvatarStateDataTypeProvider,
   ImageStateDataTypeProvider,
} from './formatters';

const columns = [
   { name: 'trainingTypeId', title: 'ID' },
   { name: 'image', title: 'Zdjęcie' },
   { name: 'title', title: 'Nazwa' },
   { name: 'trainer', title: 'Prowadzący zajęcia' },
   { name: 'duration', title: 'Czas trwania' },
   { name: 'rating', title: 'Ocena' },
];

const tableMessages = {
   noData: 'Brak typów treningu do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

export const TrainingTypeTable = ({
   trainingTypes,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <Grid rows={trainingTypes} columns={columns}>
      <AvatarStateDataTypeProvider for={['trainer']} />
      <ImageStateDataTypeProvider for={['image']} />
      <PagingState
         currentPage={pageNumber}
         pageSize={pageSize}
         onCurrentPageChange={setPageNumber}
         onPageSizeChange={setPageSize}
      />
      <IntegratedPaging />
      <Table messages={tableMessages} />
      <TableHeaderRow />
      <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
   </Grid>
);
