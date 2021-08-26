import React from 'react';
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
import { RowDialogContextProvider } from 'src/main/components/contexts/RowDialogContext';
import {
   DeleteTrainingTypeDialog,
   EditTrainingTypeDialog,
   InfoTrainingTypeDialog,
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

export const TrainingTypeTable = ({
   trainingTypes,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <RowDialogContextProvider>
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
         <TableHeaderRow />
         <PagingPanel pageSizes={[5, 10, 0]} messages={pagingPanelMessages} />
      </Grid>
      <DeleteTrainingTypeDialog />
      <EditTrainingTypeDialog />
      <InfoTrainingTypeDialog />
   </RowDialogContextProvider>
);
