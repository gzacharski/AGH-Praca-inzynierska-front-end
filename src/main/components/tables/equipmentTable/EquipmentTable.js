/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import {
   IntegratedPaging,
   PagingState,
   SearchState,
   IntegratedFiltering,
   DataTypeProvider,
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
   DialogContextProvider,
   DialogContext,
} from 'src/main/components/contexts/DialogContext';
import { ActionFormatter } from 'src/main/components/tables/utils/columnFormatters/ActionColumnFormatter';
import {
   ImageStateDataTypeProvider,
   EquipmentStateDataTypeProvider,
   TrainingsStateDataTypeProvider,
} from './formatters';
import {
   AddEquipmentDialog,
   DeleteEquipmentDialog,
   EditEquipmentDialog,
   InfoEquipmentDialog,
} from './dialogs';

const tableMessages = {
   noData: 'Brak danych na temat sprzętu do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const columns = [
   // { name: 'equipmentId', title: 'ID' },
   { name: 'image', title: 'Zdjęcie' },
   { name: 'title', title: 'Nazwa' },
   // { name: 'state', title: 'Stan' },
   // { name: 'quantity', title: 'Ilość' },
   // { name: 'purchaseDate', title: 'Data zakupu' },
   // { name: 'lastServiceDate', title: 'Data ostatniego serwisu' },
   // { name: 'trainings', title: 'Przypisany do treningów' },
   { name: '_action', title: 'Akcja' },
];

export const ActionStateDataTypeProvider = (props) => (
   // eslint-disable-next-line react/jsx-props-no-spreading
   <DataTypeProvider formatterComponent={ActionFormatter} {...props} />
);

const HeaderCell = ({ column, ...restProps }) => {
   const { openAddDialog } = useContext(DialogContext);
   if (column.name === '_action') {
      return (
         <TableHeaderRow.Cell {...restProps}>
            <span>{column.title}</span>
            <Tooltip title="Dodaj nowy typ treningu" arrow>
               <IconButton
                  onClick={openAddDialog}
                  style={{ marginLeft: '30px' }}
               >
                  <AddIcon />
               </IconButton>
            </Tooltip>
         </TableHeaderRow.Cell>
      );
   }
   return <TableHeaderRow.Cell {...restProps} />;
};

export const EquipmentTable = ({ data }) => (
   <DialogContextProvider>
      <Grid rows={data} columns={columns}>
         <ImageStateDataTypeProvider for={['image']} />
         <EquipmentStateDataTypeProvider for={['state']} />
         <TrainingsStateDataTypeProvider for={['trainings']} />
         <ActionStateDataTypeProvider for={['_action']} />

         <PagingState defaultCurrentPage={0} defaultPageSize={10} />
         <SearchState defaultValue="" />
         <IntegratedPaging />
         <IntegratedFiltering />
         <Table messages={tableMessages} />
         <TableHeaderRow cellComponent={HeaderCell} />
         <Toolbar />
         <PagingPanel
            pageSizes={[5, 10, 20, 50, 0]}
            messages={pagingPanelMessages}
         />
         <SearchPanel />
      </Grid>
      <AddEquipmentDialog />
      <DeleteEquipmentDialog />
      <EditEquipmentDialog />
      <InfoEquipmentDialog />
   </DialogContextProvider>
);
