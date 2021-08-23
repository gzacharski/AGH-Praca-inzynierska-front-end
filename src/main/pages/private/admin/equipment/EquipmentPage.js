/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import faker from 'faker';
import { Typography, Paper, Chip, Avatar, Tooltip } from '@material-ui/core';
import {
   DataTypeProvider,
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
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './EquipmentPage.styles';

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

const ImageFormatter = ({ row }) => {
   const classes = useStyles();
   const { image = '', title = '' } = row;
   return (
      <Tooltip title={title} arrow placement="right">
         <Avatar
            variant="rounded"
            alt={title}
            src={image}
            className={classes.avatar}
         />
      </Tooltip>
   );
};

const ImageStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ImageFormatter} {...props} />
);

const EquipmentStateFormatter = ({ value }) => (
   <Chip label={value} size="small" />
);

const EquipmentStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={EquipmentStateFormatter} {...props} />
);

const TrainingsFormatter = ({ value }) => {
   const trainings = value.map((training) => (
      <Chip key={training} label={training} size="small" />
   ));
   return <div>{trainings}</div>;
};

const TrainingsStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={TrainingsFormatter} {...props} />
);

const tableMessages = {
   noData: 'Brak danych na temat sprzętu do wyświetlenia',
};

const getTestEquipment = () => ({
   equipmentId: faker.random.uuid(),
   image: faker.image.image(),
   title: faker.random.word(),
   state: faker.random.arrayElement(['W użyciu', 'Wycofany', 'Nieużywany']),
   quantity: faker.datatype.number(15),
   purchaseDate: faker.date.past().toISOString(),
   lastServiceDate: faker.date.past().toISOString(),
   trainings: faker.random.arrayElements([
      'Pilates',
      'Rowery',
      'TRX',
      'Sztangi',
      'Joga',
   ]),
});

const getRows = (count) => {
   const testRows = [];
   for (let i = 0; i < count; i += 1) {
      testRows.push(getTestEquipment());
   }
   return testRows;
};

const rows = getRows(15);

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const EquipmentPage = () => {
   const classes = useStyles;

   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Modyfikuj sprzęt (admin)
         </Typography>
         <Paper>
            <Grid rows={rows} columns={columns}>
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
         </Paper>
      </PageWrapper>
   );
};

export default EquipmentPage;
