/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import faker from 'faker';
import { Typography, Paper, Chip, Avatar, Tooltip } from '@material-ui/core';
import {
   DataTypeProvider,
   IntegratedPaging,
   PagingState,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   Table,
   TableHeaderRow,
   PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './UsersPage.styles';

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

const AccountStateFormatter = ({ value }) => (
   <Chip
      label={value ? 'Aktywne' : 'Nieaktywowane'}
      color={value ? 'primary' : 'secondary'}
      size="small"
   />
);

const AccountStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={AccountStateFormatter} {...props} />
);

const AvatarFormatter = ({ row }) => {
   const classes = useStyles();
   const { avatar = '', name = ' ', surname = ' ' } = row;
   return (
      <Tooltip title={`${name} ${surname}`} arrow placement="right">
         <Avatar
            alt={`${name} ${surname}`}
            src={avatar}
            className={classes.avatar}
         >{`${name?.[0]}${surname?.[0]}`}</Avatar>
      </Tooltip>
   );
};

const AvatarStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={AvatarFormatter} {...props} />
);

const RolesFormatter = ({ value }) => {
   const roles = value.map((role) => (
      <Chip key={role} label={role} size="small" />
   ));
   return <>{roles}</>;
};

const RolesStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={RolesFormatter} {...props} />
);

// eslint-disable-next-line no-unused-vars
const getTestUser = () => ({
   userId: faker.random.uuid(),
   avatar: faker.internet.avatar(),
   name: faker.name.firstName(),
   surname: faker.name.lastName(),
   email: faker.internet.email(),
   phone: faker.phone.phoneNumber(),
   roles: faker.random.arrayElements([
      'user',
      'admin',
      'trainer',
      'employee',
      'manager',
   ]),
   enabled: faker.random.boolean(),
});

const getRows = (count) => {
   const testRows = [];
   for (let i = 0; i < count; i += 1) {
      testRows.push(getTestUser());
   }
   return testRows;
};

const rows = getRows(100);

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const AccountPage = () => {
   const classes = useStyles;
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Użytkownicy
         </Typography>
         <Paper>
            <Grid rows={rows} columns={columns}>
               <AccountStateDataTypeProvider for={['enabled']} />
               <AvatarStateDataTypeProvider for={['avatar']} />
               <RolesStateDataTypeProvider for={['roles']} />
               <PagingState defaultCurrentPage={0} defaultPageSize={10} />
               <IntegratedPaging />
               <Table />
               <TableHeaderRow />
               <PagingPanel
                  pageSizes={[5, 10, 15, 0]}
                  messages={pagingPanelMessages}
               />
            </Grid>
         </Paper>
      </PageWrapper>
   );
};

export default AccountPage;
