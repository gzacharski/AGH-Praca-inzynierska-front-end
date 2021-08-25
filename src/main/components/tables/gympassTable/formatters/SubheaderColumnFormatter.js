/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const SubheaderFormatter = ({ value }) =>
   value ? <>{value}</> : <Typography>-</Typography>;

export const SubheaderStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={SubheaderFormatter} {...props} />
);
