import React from 'react';
import { IntegratedPaging, PagingState } from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { DialogContextProvider } from 'src/main/components/contexts/DialogContext';
import {
   AccountStateDataTypeProvider,
   RolesStateDataTypeProvider,
   AvatarStateDataTypeProvider,
   ActionStateDataTypeProvider,
} from './formatters/index';
import { InfoTrainingTypeDialog } from './dialogs';

const columns = [
   { name: 'avatar', title: 'Zdjęcie' },
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

export const UsersTable = ({
   users,
   pageNumber,
   pageSize,
   setPageNumber,
   setPageSize,
}) => (
   <DialogContextProvider>
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
      <InfoTrainingTypeDialog />
   </DialogContextProvider>
);
