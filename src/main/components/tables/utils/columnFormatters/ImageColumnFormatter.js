/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Avatar, Tooltip, makeStyles } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const useStyles = makeStyles({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
});

const ImageFormatter = ({ row = {} }) => {
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

export const ImageStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ImageFormatter} {...props} />
);
