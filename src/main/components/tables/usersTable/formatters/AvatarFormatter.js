/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Avatar, Tooltip, makeStyles } from '@material-ui/core';
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

const AvatarFormatter = ({ row = {} }) => {
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
