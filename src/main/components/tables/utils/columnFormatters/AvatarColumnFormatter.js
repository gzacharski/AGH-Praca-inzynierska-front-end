/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Avatar, Tooltip, makeStyles, Typography } from '@material-ui/core';
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

const AvatarFormatter = ({ value = {} }) => {
   const classes = useStyles();
   const { avatar = '', name = ' ', surname = ' ' } = value;
   return (
      <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
         <Tooltip title={`${name} ${surname}`} arrow placement="right">
            <Avatar
               alt={`${name} ${surname}`}
               src={avatar}
               className={classes.avatar}
            >{`${name?.[0]}${surname?.[0]}`}</Avatar>
         </Tooltip>
         <Typography>{`${name} ${surname}`}</Typography>
      </div>
   );
};

export const AvatarStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={AvatarFormatter} {...props} />
);
