/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const RolesFormatter = ({ value }) => {
   const roles = value.map((role) => (
      <Chip key={role} label={role} size="small" />
   ));
   return <>{roles}</>;
};

export const RolesStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={RolesFormatter} {...props} />
);
