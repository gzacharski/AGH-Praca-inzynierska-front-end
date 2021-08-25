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
import { ActionFormatter } from 'src/main/components/tables/utils/columnFormatters';
import { RowDialogContextProvider } from 'src/main/components/contexts/RowDialogContext';
import {
   AccountStateDataTypeProvider,
   RolesStateDataTypeProvider,
   AvatarStateDataTypeProvider,
} from './formatters/index';

const columns = [
   { name: 'userId', title: 'ID' },
   { name: 'avatar', title: 'Zdjęcie profilowe' },
   { name: 'name', title: 'Imię' },
   { name: 'surname', title: 'Nazwisko' },
   { name: 'email', title: 'Email' },
   { name: 'phone', title: 'Telefon' },
   { name: 'roles', title: 'Przypisane role' },
   { name: 'enabled', title: 'Stan konta' },
   { name: '_action', title: 'Akcja' },
];

const tableMessages = {
   noData: 'Brak użytkowników do wyświetlenia',
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

export const UsersTable = ({
   users,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <RowDialogContextProvider>
      <Grid rows={users} columns={columns}>
         <AccountStateDataTypeProvider for={['enabled']} />
         <AvatarStateDataTypeProvider for={['avatar']} />
         <RolesStateDataTypeProvider for={['roles']} />
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
         <PagingPanel
            pageSizes={[5, 10, 20, 50]}
            messages={pagingPanelMessages}
         />
      </Grid>
   </RowDialogContextProvider>
);
