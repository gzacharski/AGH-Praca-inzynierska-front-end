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
import { DialogContextProvider } from 'src/main/components/contexts/DialogContext';
import {
   AccountStateDataTypeProvider,
   RolesStateDataTypeProvider,
   AvatarStateDataTypeProvider,
   EmployeeActionStateDataTypeProvider,
   ManagerActionStateDataTypeProvider,
   ActionStateDataTypeProvider,
} from './formatters/index';
import { InfoTrainingTypeDialog, UserRolesDialog } from './dialogs';

const columns = [
   { name: 'avatar', title: 'Zdjęcie' },
   { name: 'name', title: 'Imię' },
   { name: 'surname', title: 'Nazwisko' },
   { name: 'email', title: 'Email' },
   // { name: 'phone', title: 'Telefon' },
   // { name: 'roles', title: 'Przypisane role' },
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
   employeeActions,
   adminActions,
   managerActions,
}) => (
   <DialogContextProvider>
      <Grid rows={users} columns={columns}>
         <AccountStateDataTypeProvider for={['enabled']} />
         <AvatarStateDataTypeProvider for={['avatar']} />
         <RolesStateDataTypeProvider for={['roles']} />
         {employeeActions && (
            <EmployeeActionStateDataTypeProvider for={['_action']} />
         )}
         {managerActions && (
            <ManagerActionStateDataTypeProvider for={['_action']} />
         )}
         {adminActions && <ActionStateDataTypeProvider for={['_action']} />}

         <PagingState
            currentPage={pageNumber}
            pageSize={pageSize}
            onCurrentPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
         />
         <SearchState defaultValue="" />
         <IntegratedPaging />
         <IntegratedFiltering />
         <Table messages={tableMessages} />
         <TableHeaderRow />
         <Toolbar />
         <PagingPanel
            pageSizes={[5, 10, 20, 50]}
            messages={pagingPanelMessages}
         />
         <SearchPanel />
      </Grid>
      <InfoTrainingTypeDialog />
      <UserRolesDialog />
   </DialogContextProvider>
);
