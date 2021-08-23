/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import {
   Paper,
   Chip,
   Avatar,
   Tooltip,
   LinearProgress,
} from '@material-ui/core';
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
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchAdminUsersList,
} from 'src/main/store/sliceFiles/adminSlices/usersSlice';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
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

const tableMessages = {
   noData: 'Brak użytkowników do wyświetlenia',
};

const pagingPanelMessages = {
   showAll: 'Wszystko',
   rowsPerPage: 'Ilość wierszy na stronę',
   info: '{from} do {to} z {count}',
};

const AccountPage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const users = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const auth = useAuth();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = auth;
         dispatch(fetchAdminUsersList({ pageNumber: 0, pageSize: 50, token }));
      }
   }, [status, dispatch]);

   const { enqueueSnackbar } = useSnackbar();

   if (message) {
      enqueueSnackbar(message, {
         variant: notistackVariant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;

   return (
      <PageWrapper>
         <PageTitle>Użytkownicy</PageTitle>
         <Paper>
            {shouldRenderProgress && <LinearProgress />}
            <Grid rows={users} columns={columns}>
               <AccountStateDataTypeProvider for={['enabled']} />
               <AvatarStateDataTypeProvider for={['avatar']} />
               <RolesStateDataTypeProvider for={['roles']} />
               <PagingState defaultCurrentPage={0} defaultPageSize={10} />
               <IntegratedPaging />
               <Table messages={tableMessages} />
               <TableHeaderRow />
               <PagingPanel
                  pageSizes={[5, 10, 20, 50]}
                  messages={pagingPanelMessages}
               />
            </Grid>
         </Paper>
      </PageWrapper>
   );
};

export default AccountPage;
