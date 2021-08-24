import React from 'react';
import { IntegratedPaging, PagingState } from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
   AccountStateDataTypeProvider,
   AvatarStateDataTypeProvider,
   RolesStateDataTypeProvider,
} from './formatters';

const columns = [
   { name: 'userId', title: 'ID' },
   { name: 'avatar', title: 'Zdjęcie profilowe' },
   { name: 'name', title: 'Imię' },
   { name: 'surname', title: 'Nazwisko' },
   { name: 'email', title: 'Email' },
   { name: 'phone', title: 'Telefon' },
   { name: 'roles', title: 'Przypisane role' },
   { name: 'enabled', title: 'Stan konta' },
];

const tableMessages = {
   noData: 'Brak użytkowników do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

export const UsersTable = ({
   users,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <Grid rows={users} columns={columns}>
      <AccountStateDataTypeProvider for={['enabled']} />
      <AvatarStateDataTypeProvider for={['avatar']} />
      <RolesStateDataTypeProvider for={['roles']} />
      <PagingState
         currentPage={pageNumber}
         pageSize={pageSize}
         onCurrentPageChange={setPageNumber}
         onPageSizeChange={setPageSize}
      />
      <IntegratedPaging />
      <Table messages={tableMessages} />
      <TableHeaderRow />
      <PagingPanel pageSizes={[5, 10, 20, 50]} messages={pagingPanelMessages} />
   </Grid>
);
