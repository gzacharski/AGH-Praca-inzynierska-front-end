import React from 'react';
import faker from 'faker';
import { Paper } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { EquipmentTable } from 'src/main/components/tables';

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

const AccountPage = () => (
   <PageWrapper>
      <PageTitle>Zarządzaj sprzętem fitness</PageTitle>
      <Paper>
         <EquipmentTable data={rows} />
      </Paper>
   </PageWrapper>
);

export default AccountPage;
