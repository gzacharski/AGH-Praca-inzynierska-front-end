/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip, Avatar, Tooltip, makeStyles } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   avatar: {
      width: spacing(4),
      height: spacing(4),
   },
}));

const AccountStateFormatter = ({ value }) => (
   <Chip
      label={value ? 'Aktywne' : 'Nieaktywowane'}
      color={value ? 'primary' : 'secondary'}
      size="small"
   />
);

export const AccountStateDataTypeProvider = (props) => (
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

export const AvatarStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={AvatarFormatter} {...props} />
);

const RolesFormatter = ({ value }) => {
   const roles = value.map((role) => (
      <Chip key={role} label={role} size="small" />
   ));
   return <>{roles}</>;
};

export const RolesStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={RolesFormatter} {...props} />
);
