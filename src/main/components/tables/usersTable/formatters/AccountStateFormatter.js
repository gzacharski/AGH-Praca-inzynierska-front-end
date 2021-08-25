/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

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
